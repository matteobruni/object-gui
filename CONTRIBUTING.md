# Contributing to Object GUI

## Themes

You can add any kind of theme to this project, at least they be readable and usable.

Themes with same text and background color won't be accepted so test the project correctly.

### How to create a theme

To create a theme you need to perform two actions on `CSS` (`SCSS`):

#### Add the `scss` theme file

You need to add a new `scss` file here: `src/scss/themes/` like `src/scss/themes/_light.scss`.

The content should be something like:

*Normal Theme*

```scss
@use "../utils/theme";

$bgColor: #fff;
$textColor: #000;
$borderColor: #000;

@include theme.create-theme(
  "light", /* theme name, used in script and in classes */
  $bgColor, /* background color */
  $textColor, /* text color */
  $borderColor, /* border color */
  rgba(0, 0, 0, 0.03), /* header background color */
  $textColor, /* header text color */
  rgba(0, 0, 0, 0.125), /* number slider background color */
  $bgColor, /* button background color */
  $textColor, /* button text color */
  darken($bgColor, 10%) /* button hover background color */
);
```

*Neumorphic Theme*
```scss
@use "../utils/neutheme";

$bgColor: #fff;
$textColor: #000;
$lightColor: #fff;
$shadowColor: rgba(209, 205, 199);
$activeColor: rgb(22, 57, 230);
$disactiveColor: #ccc;

@include neutheme.create-neu-theme(
  "light", /* theme name, used in scripts and classes */
  $bgColor, /* background color */
  $textColor, /* text color */
  $textColor, /* title text color */
  $activeColor, /* slider background color */
  $bgColor, /* button background color */
  $textColor, /* button text color */
  darken($bgColor, 10%), /* button hover background color */
  $activeColor, /* active switch color */
  $disactiveColor, /* disactive switch color */
  $lightColor, /* light color */
  $shadowColor /* shadow color */
);
```
 
#### Add the theme to the main `scss` file

You need to add a line to the `src/scss/editor.scss` file

```scss
@use "themes/light"; /* replace light with the file name you created previously */
```

#### Add the theme to the script file

After all the `SCSS` modifications you need to do one last thing, add it to the theme list used in script

You need to add a line to `src/ts/Editor.ts`

The line must be added below this line

```javascript
this._themes = [];
```

This is the line that need to be added

```javascript
this.addTheme("light"); // replace light with the theme name parameter of the create-theme mixin
```

- 

## Scripts

You can fix all bugs you'll find in scripts files, new controls instead need to be discussed.

## How to build and test the project

The project has all the scripts you need to build and test it easily

### Preparing the folder

Before start coding the first thing to do is run this command

```shell
yarn
```

So `yarn` can install all the required packages needed to build and run the project

If you don't have `yarn` installed run this command

```shell
npm install -g yarn
```

Then rerun the previous command

### Build the project

To build the project and test everything is building correctly (any failed build PRs won't be merged until fixed) you need to run this command

```shell
yarn build
```

### Starting the project

To run the project and test in the browser how everything is appearing and working you just need to run this command

```shell
yarn start
```

This command runs the build command too, so you can just run this command if you made changes and want to test it in browser.

The project will run on url <http://localhost:3030>

#### Building after the project is started

If the project is already started you can still rebuild all the script files, you need another shell where you can run another build command.

After the build command is completed just refresh the browser window
