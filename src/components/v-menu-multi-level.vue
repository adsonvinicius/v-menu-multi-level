<template>
    <div id="v-menu-multi-level" class="container">
        <div class="prepend">
            <slot name="prepend"></slot>  
        </div>
        <ul class="menu-container" :style="alignMenu">
            <v-menu-item v-for="(item, index) in menu" :key="`${index}`" :item="item" :customProps="customProps"></v-menu-item>                          
        </ul>
        <div class="append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VMenuItem from './v-menu-item.vue'
import merge from 'lodash.merge'

export default {
  name: 'v-menu-multi-level',
  components: {
    VMenuItem
  },
  props: [      
    'nodes', 'align', 'sortItems', 'label', 'children', 'ignoreSortRootItems', 'keepOpened',
    'openDirection', 'rootItemPosition', 'offsetDownDirection', 'openOnLeafOnly', 'iconRootBefore',
    'iconRootAfter', 'iconDownBefore', 'iconDownBeforeLeaf', 'iconDownAfter',
    'iconRightBefore', 'iconRightBeforeLeaf', 'iconRightAfter', 'rootItemStyle',
    'rootItemActiveStyle', 'rootItemHoverStyle', 'containerItemsStyleRight',
    'containerItemsStyleDown', 'itemStyle', 'stripedStyle', 'itemHoverStyle', 'itemActiveStyle'
  ],
  data() {
      return { 
            p_align: 'center',
            p_sortItems:  (a, b) => { return a[this.customProps.label].localeCompare(b[this.customProps.label]) },
            p_ignoreSortRootItems: false,
            p_keepOpened: false,
            customProps: {               
                offsetDownDirection: 20,
                label: 'label',
                children: 'children',
                openOnLeafOnly: true,
                iconRootBefore : {
                    opened: { icon: '', style: '' },
                    closed: { icon: '', style: '' }  
                },
                iconRootAfter : {
                    opened: {icon: '▾', style: { marginLeft: '10px', transform: 'rotate(180deg)'}},
                    closed: {icon: '▾', style: { marginLeft: '10px'}}
                },
                iconDownBefore :  { opened: { icon: '', style: {} }, closed: { icon: '', style: {} }},
                iconDownBeforeLeaf : { icon: '', style: {}},
                iconDownAfter : {
                    opened: { icon: '–', style: { marginLeft: '10px'}},
                    closed: { icon: '+', style: { marginLeft: '10px'}}
                },
                iconRightBefore : { opened: { icon: '', style: {} }, closed: { icon: '', style: {} }},
                iconRightBeforeLeaf : { icon: '', style: {} },
                iconRightAfter : {
                   opened: {icon: '▾', style: { marginLeft: '10px', transform: 'rotate(90deg)'}},
                   closed: {icon: '▾', style: { marginLeft: '10px', transform: 'rotate(-90deg)'}}
                }, 
                rootItemStyle: {
                    backgroundColor: '#f9f9f9',
                    textAlign: 'center',
                    fontSize: '14px',
                    padding: '10px 20px'
                },
                rootItemActiveStyle: {
                    color: '#fff',
                    background: '#444'
                },
                rootItemHoverStyle: {
                    backgroundColor: '#eee'
                },
                containerItemsStyleDown: {
                    border: 'solid 1px #eee'
                },
                containerItemsStyleRight: {
                    border: 'solid 1px #eee'
                },
                itemStyle:{
                    padding: '6px',
                    backgroundColor: '#f5f5f5'      
                },
                stripedStyle: 
                [
                    { backgroundColor: '#f9f9f9' },          
                    { backgroundColor: '#f1f1f1' }
                ],
                itemHoverStyle: {
                    backgroundColor: '#e7e7e7'
                },            
                itemActiveStyle: {
                    color: '#fff',
                    background: '#444'
                } 
            }    
        }
    },
    methods: {
        clickItem(event, item){
            let data = Object.assign({}, item)
            delete data.properties
            this.$emit('click-item', event, data)
        },
        setItemsProperties(item, level, parentVmmlID, vmmlID, openDirection, rootItemPosition){           
            let actual_vmmlID = parentVmmlID < 1 ? 'vmmlID_'+ vmmlID : parentVmmlID + '_' + vmmlID                
            let properties = {
                level: level,
                vmmlID: actual_vmmlID,
                openDirection: item[this.customProps.children].length > 0 && level != 0 ? openDirection : 'down',
                rootItemPosition: rootItemPosition
            }
            if(item[this.customProps.children].length > 0 && typeof(this.p_sortItems) === 'function')
                item[this.customProps.children].sort(this.p_sortItems)

            Vue.set(item, 'properties', properties)   
            let _vmmlID = 0         
            for(let i = 0; i < item[this.customProps.children].length; i++){
                this.setItemsProperties(item[this.customProps.children][i], level + 1, actual_vmmlID, ++_vmmlID, openDirection, rootItemPosition)
            }
        },
        checkObjectProperty(obj, key){
            for(var prop in obj) {
                 if(prop == key) return true
            }
            return false
        },
        closeInstanceByVmmID(VueCompoment, vmmlID){
            if(typeof VueCompoment.item !== 'undefined'){
                if(vmmlID == null || vmmlID.indexOf(VueCompoment.item.properties.vmmlID) < 0 )
                    VueCompoment.isClosed = true
            }
            for(let i = 0; i < VueCompoment.$children.length; i++)
                this.closeInstanceByVmmID(VueCompoment.$children[i], vmmlID)
        },
        closeVMenuItems(vmmlID){
            if(!this.p_keepOpened){
                try {
                    this.closeInstanceByVmmID(this, vmmlID)
                }catch(ex){
                    console.log(ex)
                }
            }
        },
        generateMenu(){            
            let _rootItemPosition = ['left', 'right'].indexOf(this.rootItemPosition) > -1 ? this.rootItemPosition : 'left'
            let _openDirection = ['down', 'right'].indexOf(this.openDirection) > -1 ? this.openDirection : 'right'
            let _level = 0
            let _parentVmmlID = -1
            let _vmmlID = 0
            let _nodes = JSON.parse(JSON.stringify(this.nodes))
            for(let i=0; i < _nodes.length; i++)
                this.setItemsProperties(_nodes[i], _level, _parentVmmlID, ++_vmmlID, _openDirection, _rootItemPosition)
            if(_nodes.length > 0 && !this.p_ignoreSortRootItems && typeof(this.p_sortItems) === 'function')
                _nodes.sort(this.p_sortItems)
            return _nodes.filter(it => it.visible != false)
        }
    },
    created(){
        this.p_align = ['center', 'fill', 'left', 'right'].indexOf(this.align) > -1 ? this.align : 'center'
        this.p_keepOpened = [true, 'true'].indexOf(this.keepOpened) > -1       
        this.p_sortItems = this.sortItems || this.p_sortItems
        this.p_ignoreSortRootItems = [true, 'true'].indexOf(this.ignoreSortRootItems) > -1    
        for(let prop in this._props) {
            if(typeof(this[prop]) !== 'undefined') {
                if(typeof(this[prop]) === 'object' && typeof this.customProps[prop] === 'object' && !Array.isArray(this.customProps[prop])) {
                    Vue.set(this.customProps, prop, merge({}, this.customProps[prop], this[prop]))
                }
                else {
                    if(typeof this.customProps[prop] === typeof(this[prop]))
                        Vue.set(this.customProps, prop, this[prop])
                    else
                        Vue.set(this.customProps, prop, false)
                }
            }
        }
    },
    mounted(){
        document.addEventListener('click', () => {     
           this.closeVMenuItems(null)
        })
    },
    computed : {
        menu : function(){
            return typeof this.nodes === 'object' ? this.generateMenu() : []
        },
        alignMenu: function(){
            if(this.p_align == 'left')
                return 'justify-content: flex-start'
            else if(this.p_align == 'fill')  
                return 'justify-content: space-between'       
            else if(this.p_align == 'right')
                return 'justify-content: flex-end'
            else
                return 'justify-content: center'
        }
    }
}
</script>

<style scoped>

#v-menu-multi-level {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    white-space: nowrap;
    -webkit-user-select: none; 
    -webkit-touch-callout: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
    background-color: #f8f9fa!important;   

    margin: 0;
    padding: 0;

    font-weight: 400;
    color: #212529;
    
    background-color: #fff;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
}

#v-menu-multi-level ul,  #v-menu-multi-level li {
    margin: 0;
    padding: 0;
    text-align: left;
}

#v-menu-multi-level .menu-container {
    display: flex!important;
    flex-basis: auto;
    flex-grow: 1;
    align-items: center;
    flex-direction: row;
    list-style: none;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
}

#v-menu-multi-level .align-fill-menu {
    justify-content: space-between;
}

#v-menu-multi-level.container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
}

#v-menu-multi-level .prepend {
    display: flex!important;
    flex-basis: auto;
    flex-direction: column;
}

#v-menu-multi-level .append {
    display: flex!important;
    flex-basis: auto;
    flex-direction: column;
}

</style>