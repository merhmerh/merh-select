# merh-select
Merh-Select – no fuzz Vanilla JS dropdown select

# Features:
- Fully Customizable
- Zero Dependencies, built with Vanilla Javascript
- Accept images or icon
- Multiple or Single select

Installation:
-

1. Include Javascript
```javascript
<script src="path/to/merhselect.js">
```
2. Include CSS
```javascript
<link rel="stylesheet" href="path/to/merhselect.css">
```

3. HTML
```javascript
<select id="merh-select"></select>
```

4. Init
```javascript
const filter = new merhSelect({
  selectorID: 'merh-select',
  options: [
    ['visible value 1', 'data-value 1', 'path/to/image'],
    ['visible value 2', 'data-value 2', 'path/to/image'],
    ['visible value 3', 'data-value 3', 'path/to/image'],
  ],
```
Visible value, are values that are seen from client point of view. 
Data value, are values that will be referenced.
Example: your if option value is 'youtube-video', you can set the visible value to 'yt-video' instead.

# Options:
|Name|Data-Type|Description|
| --- | --- | --- |
| placeholder | string | placeholder string or first option value |
| multiple | boolean | multiple select or single select |
| autoClose | boolean | Only applicable to multi-select, close dropdown box whenever a option is selected |
| firstOptionReset | boolean | Only applicable to multi-select, de-select all option when first option is selected |

# Methods:

1. Get Selected Values: return data-value of selected option(s)
```javascript
const selected = filter.selected()
```

2. Set current dropdown value: select change dropdown value to selected option
```javascript
filter.set('data-value 3')
```
