
<template>
    <div class="typeahead-wrapper">
        <input :placeholder="placeholder" type='text' class='typeahead-input'
            @dblclick="onValueEntered($event.target.value)"
            @keyup.up="moveOption('up')"
            @keyup.down="moveOption('down')"
            @keyup.esc="hideOptions(true)"
            @blur.capture="hideOptions"
            ref="input" @input="onValueEntered($event.target.value)"
            />

        <ul class="typeahead-matches-list" v-show="showMatches" ref="matchesList">
            <li v-for="match in matches" 
                class="typeahead-match-list-item" 
                @click="onMatchSelected(match)"                 
                @mouseover.self="onmouseover($event.target)"
                @mouseleave.capture="onmouseout($event.target)">
                <slot name="typeahead-match" :match="match">
                    <div>{{match.name}}</div>
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
        // this occurs when the binded model changes without an input event
        // for example when resetting the form        
        this.$refs.input.value = val ? this.getMatchLabel(val) : val;
        }
    },
    
    methods: {        
        hideOptions(forceClose) {        
            setTimeout(() => {
                const preventBlur = !!this.$refs.matchesList.querySelector('li.hovered');
                console.log("prevent blur", preventBlur);
                
                if(forceClose) {
                    this.showMatches = false;
                } else if(!preventBlur) {
                    this.showMatches = false;
                }                
            }, 200);
        },
        
        onmouseover(elem) {
            elem.classList.add('hovered');
        },
    
        onmouseout(elem) {
            elem.classList.remove('hovered');
        },
        
        moveOption(direction) {            
            if(direction === 'down') {
                this.showMatches = true;
            }            
        },        
        
        getMatchLabel(match) {
            return match[this.labelAttr || 'label'];
        },

        onMatchSelected(match) {
            console.log(match);
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
    
    &:hover
        cursor: pointer;
        background: #337ab7;
        border: 1px solid #2e6da4;
        color: #fff;
        font-weight: bold;
</style>