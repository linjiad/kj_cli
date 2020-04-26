#!/usr/bin/env node
//命令包
const program = require('commander');
//下载包
const download = require('download-git-repo')
//模板引擎
const handlebars = require('handlebars');
//向导
const inquirer = require('inquirer');
const fs = require('fs');
//loading美化
var ora = require('ora');
//字体美化
const chalk = require('chalk');
//符号
const logSymbols = require('log-symbols')
program
    .version('0.1.0') //调用-v或者 --version的时候输出该版本号
const templates={
    'react_ordinary':{
        url:"https://github.com/linjiad/kj_react_template_class.git",
        description:"react通用模板",
        downloadUrl:"direct:https://github.com/linjiad/kj_react_template_class#master"
    },
}
program
    .command('init <template> <project>') //命令
    .description('初始化项目模板')
    .action(function(template, project){
        //下载之前做loading提示
        const spinner = ora('正在下载模板...').start();
        const {downloadUrl} = templates[template];
        //根据模板名下载对应模板，并命名为project
        //第一个参数：仓库地址
        //第二个参数：下载路径,下载到哪
        download(downloadUrl,project,{clone:true},(err)=>{
            if(err){
                spinner.fail('下载失败');//下载失败提示
                return console.log(logSymbols.error,chalk.red(err))
            }
            spinner.succeed('下载成功'); //下载成功提示
            // 把项目下的package.json读取
            // 采取向导方式采集用户输入的值
            // 使用模板引擎把用户输入的数据解析到package.json
            // 解析之后的结果从新写入package.json
            inquirer.prompt([
                {
                    typ: 'input',
                    name: 'name',
                    message: '请输入项目名称'
                },
                {
                    typ: 'input',
                    name: 'description',
                    message: '请输入项目简介'
                },
                {
                    typ: 'input',
                    name: 'author',
                    message: '请输入作者姓名'
                },
            ]).then((answers)=>{
                const packagePath = `${project}/package.json`;
                //把数据替换到package.json中
                const packageContent = fs.readFileSync(packagePath,'utf8');
                const packageResult = handlebars.compile(packageContent)(answers);
                fs.writeFileSync(packagePath,packageResult)
                console.log(logSymbols.success,chalk.green("初始化模板成功"))
            })
        })
    });

program
    .command('list') //命令
    .description('查看所有可用模板')
    .action(()=>{
        for(const key in templates){
            console.log(`${key}:${templates[key].description}.`)
        }
    });

program
    .command('setup [env]') //命令
    .description('run setup commands for all envs')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function(env, options){
        var mode = options.setup_mode || "normal";
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode', env, mode);
    });

program
    .command('exec <cmd>')
    .alias('ex')
    .description('execute the given remote cmd')
    .option("-e, --exec_mode <mode>", "Which exec mode to use")
    .action(function(cmd, options){
        console.log('exec "%s" using %s mode', cmd, options.exec_mode);
    }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
});

program
    .command('*') //其他的命令
    .action(function(env){
        console.log('不存在 "%s"命令', env);
    });

program.parse(process.argv);