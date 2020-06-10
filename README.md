# v-menu-multi-level

<h1 align="center">
    <img src="https://www.dropbox.com/s/ap793hc9swnvvcu/v-menu-multi-level-promo.png?raw=1">
    <br>  
</h1>

## Table of Contents ##

- [Introduction](#introduction)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Component Reference](#component-reference)
- [Browser Compatibility](#browser-compatibility)
- [License](#license)
- [Credits](#credits)

<h2 id="introduction">Introduction</h2>

**v-menu-multi-level** is a customlizable UI Component for VueJS that creates a multi-level menu from a JSON data on a defined structure. The assigned props allows customize this menu using CSS3 properties and change its behavior.

#### Features: ####

- Auto change sub-menu open-direction when the document body overflows.
- Set a sorting function for nodes in same level.
- Open sub-menus in *down* or *right* directions.
- Set icons and its style before or after nodes.
- Keep a sub-menu opened when click outside from them.
- Set icons when a sub-menu is opened or closed.
- Apply CSS3 for hover, active or striped on items.
- Set a root node visibilty dynamically.
- Close all opened sub-menus when click outside from them.
- Set menu alignment for root items.
- Add prepend and/or append slots for menu.
- Set a function to be executed when an item is clicked.

#### Definitions: ####

- **Node**: A JavaScript Object containing a string for a label and an array of zero or more children nodes.
- **Root**: First level of the component node's property.
- **Leaf**: A node which doesn't have children nodes.
- **Item**: A rendered node on HTML.
- **Menu**: A rendered collection of all root nodes on HTML.
- **Sub-menu**: A rendered collection of one children's node on HTML.

#### Notes ####

The generated menu uses the CSS3 property *display: flex* and its related properties for desktop platforms where the dimension of the menu depends of nodes' label, specially on root items. Any CSS3 property can be passed to container menu directly from component.

The auto *open-direction* of an item checks if the body's dimension has changed after rendered, so the *open-direction* property when is set to *right* is changed to *down* when it occurs.
<br>

<h2 id="live-demo">Live Demo</h2>
<a href="https://codepen.io/adsonvinicius/pen/KKVpjPE">Try on CodePen</a>

<h2 id="installation">Installation</h2>

```sh
yarn add v-menu-multi-level --save 
```

or

```sh
npm install v-menu-multi-level --save
```

<h2 id="basic-usage"> Basic Usage</h2>

```vue
<!-- Vue component -->
<template>
    <v-menu-multi-level :nodes="nodes"></v-menu-multi-level>
</template>

<script>
import VMenuMultiLevel from 'v-menu-multi-level'
import 'v-menu-multi-level/dist/v-menu-multi-level.css'

export default {
  components: {
    VMenuMultiLevel
  },
  data() {
    return {
      nodes: [{
        label: 'North America',
        visible: true,
        children: [{
            label: 'United States',
            children: [{
              label: 'California',
              children: [{
                label: 'Los Angeles',
                children: [{
                    label: 'Beverly Hills',
                    children: []
                  },
                  {
                    label: 'Hollywood',
                    children: []
                  },
                  {
                    label: 'Santa Monica',
                    children: []
                  }
                ]
              }]
            }]
          ]
        }
        // . . .
      }]
    }
  }
}
</script>
```

<h2 id="component-reference">Component Reference</h2>

### Properties

|  Property  |  Type  |  Default  |  Description  |
| ------------ | ------------ | ------------ | ------------ |
| align  | String  | center  | Alignment of the root items. Possible values: left, right, center, fill
| children  |  String | children  | A property name used on children nodes. |
| container&#x2011;items&#x2011;style&#x2011;down |  Object | <a href="#container-items-style-down">View</a>  |   A CSS3 style object for the container items at same level when the open-direction property is *down*.|
| container-items-style-right  |  Object |  <a href="#container-items-style-right">View</a> | A A CSS3 style object for the container items at same level when the open-direction property is *right*. |
| icon-down-after | Object  | <a href="#icon-down-after">View</a>  | The opened and closed icon properties shown after label. Each one has an icon and its style. Applies to: non-root items and *open-direction* property is *down*.|
| icon-down-before | Object  |  <a href="#icon-down-before">View</a> | The opened and closed icon properties shown before label. Each one has an icon and its style. Applies to: non-root items and *open-direction* property is *down*. |
| icon-down-before-leaf | Object | <a href="#icon-down-before-leaf">View</a>  |  The icon properties shown before label. It has an icon and its style. Applies to: leaf items and *open-direction* property is *down*.  |
| icon-right-after  | Object  |  <a href="#icon-right-after">View</a> |  The opened and closed icon properties shown after label. Each one has an icon and its style. Applies to: non-root items and *open-direction* property is *right*.  |
| icon-right-before | Object  |  <a href="#icon-right-before">View</a> |  The opened and closed icon properties shown before label. Each one has an icon and its style. Applies to: non-root items and *open-direction* property is *right*.  |
| icon-right-before-leaf | Object | <a href="#icon-right-before-leaf">View</a>  |  The icon properties shown before label. It has an icon and its style. Applies to: leaf items and *open-direction* property is *right*.  |
| icon-root-after | Object  | <a href="#icon-root-after">View</a>  |  The opened and closed icon properties shown before label. Each one has an icon and its style. Applies to: root items.  |
| icon-root-before | Object |  <a href="#icon-root-before">View</a> | The opened and closed icon properties shown before label. Each one has an icon and its style. Applies to: root items.  |
| ignore-sort-root-items |  Boolean |  false |  Ignores sorting root items on *sortItems() function. Possible values: true, false |
| item-active-style<sup>1</sup>  | Object  | <a href="#item-active-style">View</a>  | A CSS3 style object |
| item-hover-style<sup>1</sup>  |  Object |  <a href="#item-hover-style">View</a> | A CSS3 style object |
| item-style  | Object  |  <a href="#item-style">View</a> | A CSS3 style object |
| keep-opened | Boolean  | false  | Keeps sub-menus opened when opening a new one. Possible values: true, false|
| label |  String | label | A property name used on nodes' label |
| nodes |  Object |  [ ] |  An array of objects with a label and children nodes |
| offset-down-direction  |  Number | 20 |  An offset (in pixels) from a parent item when the *open-direction* property is *down* |
| open-direction  | String  |  right |   . Possible values: right,  down |
| open-on-leaf-only | Boolean  |  true | Executes a *click* event on leaf only. Possible values: true, false |
| root-item-active-style<sup>2</sup>  | Object  | <a href="#root-item-active-style">View</a>  |  A CSS3 style object |
| root-item-hover-style<sup>2</sup> | Object |  <a href="#root-item-hover-style">View</a> | A CSS3 style object |
| root-item-position  | String  | left  | Align the edge of the root items with its sub-menu. Possible values: right, left |
| root-item-style |  Object | <a href="#root-item-style">View</a>  |  A CSS3 style object |
| sort-items  |  Function |  Ascending function sort  | A sort function that compare two labels properties at same node level which results in -1, 0 or 1 |
| striped-style<sup>1</sup> | Array  | <a href="#striped-style">View</a> | Applies an array of one or more CSS3 objects for items on a submenu resulting on a striped effect |

#### Notes ####
<sup>1</sup>Inherits CSS3 properties from *itemStyle*<br/>
<sup>2</sup>Inherits CSS3 properties from *rootItemStyle*

### Slots ####
|  Name   |     Description |
| ------------ |------------ |
| append  |  Scoped slot for custom content after the menu.  |  
| prepend  | Scoped slot for custom content before the menu. | 

### Events ###
|  Event  |  Arguments  | Description |
| ------------ | ------------ | ------------ | 
| clickItem  | **event** -  Native event object.<br/>  **item** -  Node of the item  clicked. |  Emitted when an item is clicked. |


<h2 id="default-styles">Default Styles</h2>

##### [container-items-style-down](#container-items-style-down)
```css
{
  border: "solid 1px #eee"
}
```

##### [container-items-style-right](#container-items-style-right)
```css
{
  border: "solid 1px #eee"
}
```

##### [icon-down-after](#icon-down-after)
```css
{
  opened: {
    icon: "–",
    style: {
      marginLeft: "10px"
    }
  },
  closed: {
    icon: "+",
    style: {
      marginLeft: "10px"
    }
  }
}
```

##### [icon-down-before](#icon-down-before)
```css
{
  opened: {
    icon: "",
    style: { }
  },
  closed: {
    icon: "",
    style: { }
  }
}
```

##### [icon-down-before-leaf](#icon-down-before-leaf)
```css
{
  icon: "",
  style: { }
}
```

##### [icon-right-after](#icon-right-after)
```css
{
  opened: {
    icon: "▾",
    style: {
      marginLeft: "10px",
      transform: "rotate(90deg)"
    }
  },
  closed: {
    icon: "▾",
    style: {
      marginLeft: "10px",
      transform: "rotate(-90deg)"
    }
  }
}
```

##### [icon-right-before](#icon-right-before)
```css
{
  opened: {
    icon: "",
    style: { }
  },
  closed: {
    icon: "",
    style: { }
  }
}
```

##### [icon-right-before-leaf](#icon-right-before-leaf)
```css
{
  icon: "",
  style: { }
}
```

##### [icon-root-after](#icon-root-after)
```css
{
  opened: {
    icon: "▾",
    style: {
      marginLeft: "10px",
      transform: "rotate(180deg)"
    }
  },
  closed: {
    icon: "▾",
    style: {
      marginLeft: "10px"
    }
  }
}
```

##### [icon-root-before](#icon-root-before)
```css
{
  opened: {
    icon: "",
    style: ""
  },
  closed: {
    icon: "",
    style: ""
  }
}
```

##### [item-active-style](#item-active-style)
```css
{
  color: "#fff",
  background: "#444"
}
```

##### [item-hover-style](#item-hover-style)
```css
{
  backgroundColor: "#e7e7e7"
}
```

##### [item-style](#item-style)
```css
{
  padding: "6px",
  backgroundColor: "#f5f5f5"
}
```

##### [root-item-active-style](#root-item-active-style)
```css
{
  color: "#fff",
  background: "#444"
}
```

##### [root-item-hover-style](#root-item-hover-style)
```css
{
  backgroundColor: "#eee"
}
```

##### [root-item-style](#root-item-style)
```css
{
  backgroundColor: "#f9f9f9",
  textAlign: "center",
  fontSize: "14px",
  padding: "10px 20px"
}
```

##### [striped-style](#striped-style)
```css
[
  {
    backgroundColor: "#f9f9f9"
  },
  {
    backgroundColor: "#f1f1f1"
  }
]
```
<h2 id="browser-compatibility"> Browser Compatibility </h2>

|  Browser  |  Version   |
| ------------  | ------------ |
| Chrome      |  61+ |
| Firefox    |  60+ |
| Safari     |  10.1+ |
| Edge     | 16+  |
| Internet Explorer | 11+ ( Polifill needed )  |

<h2 id="license">License</h2>

**MIT**

<h2 id="credits">Credits</h2>

 Developed by **Adson Vinicius**

