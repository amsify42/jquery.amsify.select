Jquery Selection Input
-----------------------------
Jquery plugin for input type select. You can initialize the plugin in this way
```js
	$('select').amsifySelect();
```

## npm installation
```cmd
npm i amsifyselect
```

for
```html
<select>
	<option value="">Select</option>
	<option value="India">India</option>
	<option value="Afghanistan">Afghanistan</option>
	<option value="USA">USA</option>
	<option value="Russia">Russia</option>
</select>
```

# Table of Contents
1. [Simple](#simple-selection)
2. [Multiple](#multiple-selection)
3. [Option Group](#option-group)
4. [Searchable](#search-selection)
5. [Settings](#settings)
6. [Refresh Destroy](#refresh-destroy)
7. [Instantiating](#instantiating)

## Simple Selection
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

## Multiple Selection
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

## Option Group
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

## Search Selection
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

## Settings

### 1. Type
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

### 2. Limit
When limit is passed, user cannot select options more than the given limit.
```js
	$('select').amsifySelect({ limit: 5 });
```
Default limit is 30.

### 3. Label Limit
Label limit will limit the number of labels to be shown in selection area when items are being selected.
```js
	$('select').amsifySelect({ labelLimit: 5 });
```
Default labelLimit is 5.

### 4. Button Clases
If you want, you can pass css classes to the buttons we are rendering in this plugin.
```js
	$('select').amsifySelect({ 
		classes: {
			clear: 'btn btn-primary',
			close: 'btn btn-danger',
		}
	});
```

### 5. Hide Buttons
If you want, you can hide the buttons we are rendering in this plugin.
```js
	$('select').amsifySelect({ 
		hideButtons: true
	});
```

## Refresh Destroy
For refreshing the values, you can use
```js
	var params = {
		// Make sure you have parameters which used during first execution
	};
	$('select[name="country"]').amsifySelect(params, 'refresh');
```
For destroying the instance, you can do
```js
	$('select[name="country"]').amsifySelect({}, 'destory');
```

## Instantiating
This is also one of the approach you can use this plugin.
### Initilization
You can initialize by creating an instance of `AmsifySelect` and passing selector to it.
```js
amsifySelect = new AmsifySelect($('input[name="country"]'));
amsifySelect._init();
```
### Settings
You need to set it before initialization and you can use all the setting options shown in previous approach.
```js
amsifySelect._settings({
	searchable: true
});
amsifySelect._init();
````
