const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    });

function getInstallerConfig() {
   
    const rootPath = path.join('./');
    const outPath = path.join(rootPath, 'release-builds');

    return Promise.resolve({
        appDirectory: path.join(outPath, 'myschoolmanagement-win64-ia32/'),
        authors: 'Christian Engvall',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'electron-tutorial-app.exe',
        setupExe: 'myschoolmanagementAppInstaller.exe',
        setupIcon: path.join(rootPath, 'public', 'images', 'assets','128', 'logo.ico')
    });
}