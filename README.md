# postcss-embed-url

[PostCSS] plugin to emded urls.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
  src: url("https://example.com/example.jpeg");
}
```

```css
.foo {
  src: url("data:image/jpeg;charset=utf-8;base64,<base64 file content>")
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-embed-url
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-embed-url'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
