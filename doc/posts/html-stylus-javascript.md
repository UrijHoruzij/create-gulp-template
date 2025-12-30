---
title: HTML5 Stylus JavaScript
description: This is the first post on my blog
tags: post
layout: layouts/post.njk
---

> Gulp 4 is used

### Getting started

`gulp` - the basic command that runs the build for development using browser-sync

`gulp build` - the command for the production build of the project. All assets are compressed and optimized for hosting.

`gulp cache` - the command that should be run after `gulp build` if you need to upload new files to the hosting without caching.

### Folder and file structure

```
├── src/                          # Sources
│   ├── js                        # Scripts
│   │   ├── main.js               # Main script
│   │   ├── vendor                # The folder for downloading local versions of libraries
│   ├── stylus                    # Site styles (stylus preprocessor)
│   │   └── main.styl             # Main Style file
│   │   └── vendor.styl           # The file for connecting library styles from the vendor folder
│   │   └── fonts.styl            # The file for connecting fonts (you can use a mixin)
│   │   └── mixins.styl           # The file for connecting mixins from the mixins folder
│   │   └── vars.styl             # The file for writing css - or styl-variables
│   │   ├── mixins                # The folder for saving ready-made stylus components
│   │   ├── vendor                # The folder for storing local css styles of libraries
│   ├── partials                  # The folder for storing html parts of the page
│   ├── img                       # The folder for storing images
│   ├── resources                 # The folder for storing other assets - php, video files, favicon, etc.
│   │   ├── fonts                 # The folder for storing fonts in the woff2 format
│   └── index.html                # Main html-file
└── gulpfile.js                   # Gulp settings file
└── package.json                  # File with the build settings and installed packages
└── README.md                     # Build documentation
```

### Contents

1. [npm-scripts](#npm-scripts)
2. [Working with html](#working-with-html)
3. [Working with CSS](#working-with-css)
4. [Working with JavaScript](#working-with-javascript)
5. [Working with fonts](#working-with-fonts)
6. [Working with images](#working-with-images)
7. [Working with other resources](#working-with-other-resources)

### npm-scripts

You can call gulp scripts via npm.
It is also possible to validate html in the assembly.

`npm run html` - launches the html validator, you need to run it if there are html files in the **public** folder.

### Working with html

Thanks to the **gulp-file-include** plugin, you can split an html file into various templates that should be stored in the **partials** folder. It is convenient to divide an html page into sections.

> To insert html parts into the main file, use `@include('partials/filename.html')`

If you want to create a multi - page website, copy **index.html**, rename as you need, and use.

When using the `gulp build` command, you will get a minified html code in one line for all html files.

### Working with CSS

The assembly uses the **stylus** preprocessor.

Styles written in **components** should be included in **main.styl**.
Styles from **\fonts**, **\vars** and **\mixins** are connected in **global.styl**.

To connect third-party css files (libraries) - put them in the **vendor** folder and connect them in the file **vendor.styl**.

If you want to create your own mixin, do it in the **mixins** folder, and then connect it to the **\mixins.styl** file.

If you want to use scss variables, connect **\vars.styl** also to main.styl or to any other place where it is needed, but be sure to remove **:root**.

> To connect css files, use the `@import`directive

Three files are created in the resulting folder **public/css**: <br> **main.css** - for page styles, <br> **global.css** - for global styles, <br> **vendor.css** - for styles of all libraries used in the project.

When using the `gulp build` command, you will get a minified css code in one line for all css files.

### Работа с JavaScript

Support for `import` and `require` is not implemented! Files are collected automatically from various folders.

It is better to divide the JS code into components - small js files that contain their own implementation isolated from each other. Place such files in the **components** folder.

In the file **main.js** does not connect anything, it is recommended for implementing the general logic of the site.

To connect third-party js files (libraries), put them in the **vendor** folder.

When using the `gulp build` command, you will get a minified js code in one line for all js files.

### Working with fonts

The build supports only the **woff2** format.

Upload the **woff2** files to the **resources/fonts** folder, and then call the `@font-face` mixin in the **\_fonts.scss** file.

### Working with images

Put any images other than **favicon** in the **img** folder.

If you need to make an svg sprite, put the svg files needed for the sprite in the **img/svg** folder. Just leave other svg files in the **img** folder.

When using the `gulp build` command, you will get minified images in the final folder **img**.

### Working with other resources

Any resources (assets) of the project that do not have a corresponding folder assigned to them should be stored in the **resources** folder. These can be video files, php files, favicon, and others.
