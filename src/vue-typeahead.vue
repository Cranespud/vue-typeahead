<template>
    <div class="typeahead-wrapper">
        <input :placeholder="placeholder" type='text' class='typeahead-input'
            @dblclick="onValueEntered($event.target.value)"
            @keyup.up="moveOption('up')"
            @keyup.down="moveOption('down')"
            @keyup.esc="hideOptions(true)"
            @keyup.enter="selectOptionOnEnter(true)"
            @blur.capture="hideOptions"
            ref="input" @input="onValueEntered($event.target.value)"
            />

        <ul class="typeahead-matches-list" v-show="showMatches" ref="matchesList">
            <li v-for="(match, index) in matches" 
                class="typeahead-match-list-item" 
                :index="index" 
                @click="onMatchSelected(match)"                 
                @mouseover.self="onmouseover($event.target)"
                @mouseleave.capture="onmouseout($event.target)">
                <slot name="typeahead-match" :match="match">
                    <div>{{getMatchLabel(match)}}</div>
                </slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        'placeholder': String,
        'matches': {
            type: Array,
            required: true
        },
        'labelAttr': String,
        'extractLabel': Function,
        'value': {
            type: null, // accept any type 
            required: true
        }
    },
    data() {
        return {
            showMatches: false
        };
    },
      
    watch: {
        value(val) { 
        // this occurs when the bound model changes without an input event
        // for example when resetting the form        
        this.$refs.input.value = val ? this.getMatchLabel(val) : val;
        }
    },
    
    methods: {        
        hideOptions(forceClose) {
            // TODO find a better solution without setTimeout
            setTimeout(() => {
                this.showMatches = false;                                
                this.makeInctive(this._getActiveOption());
            }, 200);
        },
        
        makeActive(elem) {
            if(elem) { elem.classList.add('active'); }
        },
        
        makeInctive(elem) {
            if(elem) { elem.classList.remove('active'); }
        },
        
        _getActiveOption() {
            return this.$refs.matchesList.querySelector('li.active');
        },
        
        selectOptionOnEnter() {
            const selected = this._getActiveOption();
            
            if(!selected) { return; }
            
            const index = parseInt(selected.getAttribute('index'));
            this.onMatchSelected(this.matches[index]);
            this.makeInctive(selected);
        },
        
        onmouseover(elem) {
            if(elem) { this.makeActive(elem); }
        },
    
        onmouseout(elem) {
            if(elem) { this.makeInctive(elem); }
        },       
        
        moveOption(direction) {
            let 
            newActiveOption,
            selected = this._getActiveOption();
               
            if(!selected) { 
                this.showMatches = true;
                newActiveOption = direction === 'down' ? 
                    this.$refs.matchesList.querySelector('li:first-child') : 
                    this.$refs.matchesList.querySelector('li:last-child');
                this.makeActive(newActiveOption);
                return;
            }
            
            newActiveOption = direction === 'down' ? selected.nextSibling : selected.previousSibling;
            this.makeInctive(selected);
            this.makeActive(newActiveOption);            
        },        
        
        getMatchLabel(match) {
            if(typeof match !== 'object') {
                return match;
            }
            
            if(typeof this.extractLabel === 'function') {
                return this.extractLabel(match);
            }
            
            return match[this.labelAttr || 'label'];
        },

        onMatchSelected(match) {
            this.showMatches = false;
            this.$refs.input.value = this.getMatchLabel(match);
            this.$emit('input', match);
        },

        onValueEntered(searchTerm) {
            if(!searchTerm.trim()) {
                this.showMatches = false;
                return;
            }

            this.showMatches = true;
            this.$emit('change', searchTerm);
        }
    }
}
</script>

<style lang="sass">
    
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
</style>