# vue-typeahead

Typeahead component for Vue2 with customizable dropdown items through slots

[Checkout the demo here](http://projects.cranespud.com/vue-typeahead)

## Installation

With npm

``` npm i @cranespud/vue-typeahead ```

## Usage

```javascript
import VueTypeahead from '@cranespud/vue-typeahead'

// Then register it as a global component 
Vue.Component('vue-typeahead', VueTypeahead);

// or as a local component

new Vue({
  el: 'body',
  data: {   
  },
  components: {
    typeahead: VueTypeahead
  }
})
```

Then on the template

```html
    <typeahead 
        v-model="selectedProduct"
        @change="getMatchingProducts"
        :matches="products"  
        :labelAttr="'name'"
        :extractLabel="extractProductNameWithCustomFunction">
    </typeahead>
```

## Attributes

### matches
A an array of items to be displayed as the match list

### v-model
The selected option from the list

### @change
Event triggered when user types in into the component.  Is your responsibility to handle this event and retrieve the data.

### labelAttr
If your matches consists of an array of objects then this is the name of the property to be used as a the label on the list

### extractLabel
A function that accepts as a parameter a "match" object, used to perform custom transformations before displaying the label.  This overrides labelAttr

## Customizing the matches list
You can customize the diplayed options by providing your own slot template, within the slot the current object is published as "match" property, for example

```html
    <typeahead v-model="..." @change="..." :matches="..">
        
        <div slot="typeahead-match" slot-scope="props">
            <!-- fancy html start -->
            <span>{{props.match.employee}} - {{props.match.job}}</span>
            <!-- fancy html ends -->
        </div>
        
    </typeahead>
```

You can easily override the default styles as well, here is the entire stylesheet
```css
.typeahead-wrapper
    position: relative;
    padding: 1px;
    width: 100%;
    box-sizing: border-box;

.typeahead-input 
    width: 100%;
    margin: 0;
    box-sizing: border-box;

    
.typeahead-matches-list
    border: 1px solid #ccd0d2;
    position: absolute !important;
    width: 100%;
    background: white;
    border-radius: 4px;
    padding: 0;
    margin-top: 0;
    z-index: 100;
    position: relative;


.typeahead-match-list-item
    list-style: none;
    padding: 5px 10px;
    display: block;    
    margin: 0;
    text-align: left;
    
    &.active
        cursor: pointer;
        background: #337ab7;
        border: 1px solid #2e6da4;
        color: #fff;
        font-weight: bold;
```

