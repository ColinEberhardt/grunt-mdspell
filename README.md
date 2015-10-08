# grunt-mdspell

![build status](https://travis-ci.org/ColinEberhardt/grunt-mdspell.svg)

> Spell check your markdown files

This plugin runs a spell-checker against the markdown files within your project, reporting any errors that it finds. It's a useful addition to any project that has a lot of documentation, or markdown-based blogs. Here's an example of the output:

```
Running "mdspell:main" (mdspell) task
    overview.md
        7 | to enforce your team’s coding convntions. It is
    foo/bar.md
        3 | Monkey-patch (hook) functins for debugging and stuff.
        7 | This code should wrk just fine:
>> 3 spelling errors found in 2 files
Warning: Task "mdspell:main" failed. Use --force to continue.

Aborted due to warnings.
```

You can provide a `.spelling` file that contains global or file-specific words that should be ignored. Probably the easiest way to create this file is via the interactive [`mdspell`](https://github.com/lukeapage/node-markdown-spellcheck) tool which this grunt task is built on.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mdspell --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mdspell');
```

## The "mdspell" task

### Overview
In your project's Gruntfile, add a section named `mdspell` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mdspell: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.ignoreAcronyms
Type: `Boolean`
Default value: `false`

Ignores acronyms when spell checking.

#### options.ignoreNumbers
Type: `Boolean`
Default value: `false`

Ignores numbers such as `22nd`, `31st` - numbers without suffix, e.g. `345`, are always ignored.

### Usage Example

In this example, a number of markdown files are spell checked with both acronyms and numbers ignored.

```js
grunt.initConfig({
  mdspell: {
    options: {
      ignoreAcronyms: true,
      ignoreNumbers: true
    },
    files: {
      src: ['**/*.md']
    },
  },
});
```

When spelling errors are found, they are reported as follows:

```
Running "mdspell:main" (mdspell) task
    test/fixtures/foo.md
        7 | to enforce your team’s coding convntions. It is
    test/fixtures/sub-folder/bar.md
        3 | Monkey-patch (hook) functins for debugging and stuff.
        7 | This code should wrk just fine:
>> 3 spelling errors found in 2 files
Warning: Task "mdspell:main" failed. Use --force to continue.

Aborted due to warnings.
```
