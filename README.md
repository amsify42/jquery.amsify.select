Amsify Jquery Selection Input
-----------------------------

This is a simple jquery plugin for input type selection.
<br/>
You can initialize the plugin in this way
```js
	$('select').amsifySelect();
```

## Table of Contents
1. [Simple](#simple-selection)
2. [Multiple](#multiple-selection)
3. [Option Group](#option-group)
4. [Search](#search-selection)
5. [Settings](#settings)

### Simple Selection
For simple selection, your html select input can be
```html
	<select name="country">
		<option value="">Select Country</option>
		<option value="1">India</option>
		<option value="2">Afghanistan</option>
		<option value="3">USA</option>
		<option value="4">Russia</option>
		<option value="5">South Africa</option>
		<option value="6">West Indies</option>
	</select>
```

### Multiple Selection
For multiple selection, just add the multiple attribute to the selection
```html
	<select name="country" multiple="multiple">
		<option value="">Select Country</option>
		<option value="1">India</option>
		<option value="2">Afghanistan</option>
		<option value="3">USA</option>
		<option value="4">Russia</option>
		<option value="5">South Africa</option>
		<option value="6">West Indies</option>
	</select>
```

### Option Group
Option Group will be automatically rendered when it finds optgroup tags
```html
	<select name="country">
		<option value="">Select Country</option>
		<optgroup label="Asia">
			<option value="1">India</option>
			<option value="2">Afghanistan</option>
		</optgroup>
		<optgroup label="America">
			<option value="3">USA</option>
			<option value="4">Canada</option>
		</optgroup>
		<optgroup label="Africa">
			<option value="5">South Africa</option>
			<option value="6">Nigeria</option>
		</optgroup>
	</select>
```

### Search Selection
For making the selection search the elements, just add the searchable attribute to selection
```html
	<select name="country" searchable>
		<option value="">Select Country</option>
		<option value="1">India</option>
		<option value="2">Afghanistan</option>
		<option value="4">USA</option>
		<option value="5">Russia</option>
		<option value="6">South Africa</option>
		<option value="7">West Indies</option>
	</select>			
```

Searchable option can also be set from plugin initialization
```html
	<select id="country">
		<option value="">Select Country</option>
		<option value="1">India</option>
		<option value="2">Afghanistan</option>
		<option value="4">USA</option>
		<option value="5">Russia</option>
		<option value="6">South Africa</option>
		<option value="7">West Indies</option>
	</select>			
```
```js
	$('#country').amsifySelect({ searchable: true });
```

### Settings

#### Type
```js
	$('select').amsifySelect({ type: 'bootstrap' });
```
Default type is **bootstrap**. You can pass any one of these three
```txt
	bootstrap
	materialize
	amsify
```
Here **amsify** means, it will simply render HTML without using any css framework classes.

#### Limit
When limit is passed, user cannot select options more than the given limit.
```js
	$('select').amsifySelect({ limit: 5 });
```
Default limit is 30.

#### Label Limit
Label limit will limit the number of labels to be shown in selection area when items are being selected.
```js
	$('select').amsifySelect({ labelLimit: 5 });
```
Default labelLimit is 5.


#### Button Clases
If you want, you can pass css classes to the buttons we are rendering in this plugin.
```js
	$('select').amsifySelect({ 
		classes: {
			clear: 'btn btn-primary',
			close: 'btn btn-danger',
		}
	});
```
