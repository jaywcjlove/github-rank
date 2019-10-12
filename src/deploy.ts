import fs from 'fs-extra';
import path from 'path';
import formatter from '@uiw/formatter';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import 'console-emojis';

function execute(command: string) {
  console.log(`\n\n>> ${command}\n\n`);
  return new Promise((resolve, reject) => {
    const subProcess: ChildProcessWithoutNullStreams = spawn('bash');
    function onData(data: any) {
      process.stdout.write(data);
    }
    subProcess.on('error', (error) => {
      reject(new Error(`command failed: ${command}; ${error.message ? error.message : ''}`));
    });
    subProcess.stdout.on('data', onData);
    subProcess.stderr.on('data', onData);
    subProcess.on('close', (code: number) => {
      resolve(code);
    });
    subProcess.stdin.write(`${command} \n`);
    subProcess.stdin.end();
  });
}

const root = path.join(process.cwd(), '');
const pkgPath = path.join(root, 'package.json');

(async () => {
  try {
    const pkg = await fs.readJson(pkgPath);
    const version = formatter('YY.MM.DD', new Date);
    console.log(`> version: ${pkg.version} => ${version}`);

    await execute('npm run start');
    if (version !== pkg.version) {
      pkg.version = version;
      await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
      await execute('npm publish');
    }
    await execute('git add .');
    await execute(`git commit -m "released v${version}"`);
    await execute('git push origin master');
    await execute('git pull --all');
    await execute('git branch --format "%(if)%(upstream:short)%(then)git push . %(upstream:short):%(refname:short)%(end)" | sh');
    await execute('git push tee --all');
    (console as any)['100']('> done!');
  } catch(error) {
    console.log('error:', error);
  }
})();