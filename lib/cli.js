#!/usr/bin/env node

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 // for the issue with codebergs TLS on https://try.codeberg.org/api/v1

const gitBackup = require('./index.js')
const path = require('path')
const pkg = require(path.join(__dirname, '..', 'package.json'))
const program = require('commander')

program.version(pkg.version)

program.command('backup')
.description('backup your online git repositories')
.action(() => {
  const start = new Date()
  console.log('Creating backup...')
  gitBackup()
  .then(() => {
    const time = (new Date().getTime() - start.getTime()) / 1000
    console.log(`Done! (${time}s)`)
  })
  .catch((error) => {
    console.log(error)
  })
})

program
.command('*')
.action(() => {
  program.help()
})

program.parse(process.argv)
