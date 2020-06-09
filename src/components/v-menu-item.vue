<template>
    <li :ref="item.properties.vmmlID" @click="dispatchEventOnClickItem($event, item)" @mouseover="hover = true" @mouseleave="hover = false" :class="dropDownItemMenu">
        <div :vmml-id="item.properties.vmmlID" :style="itemMenuStyle" :class="dropDownText">
            <div class="item-menu-margin-left" :style="{ marginLeft : marginLeft }">
                <div class="item-icon-before" :style="cssIconBefore.style" v-html="cssIconBefore.icon"></div>
                <div class="item-text">{{ item[this.customProps.label] }}</div>
                <div class="item-icon-after" :style="cssIconAfter.style" v-html="cssIconAfter.icon"></div>
            </div>
        </div>
        <ul :vmml-id="item.properties.vmmlID" v-if="item[this.customProps.children].length > 0" :style="containerItem" :class="dropDownMenu">
            <v-menu-item v-for="(child, index) in item[this.customProps.children]" :key="`${index}`" :item="child" :customProps="customProps"></v-menu-item>
        </ul>
    </li>
</template>

<script>
export default {
    name: 'v-menu-item',
    props: ['item', 'customProps'],
    data() {
        return {
            isClosed: true,
            openDirection : this.item.properties.openDirection,
            rootItemPosition: this.item.properties.rootItemPosition,
            hover: false
        }
    },
    methods:{
        closeVMenuItems(vmmlID){
            this.$parent.closeVMenuItems(vmmlID)
        },
        clickItem(event, item){
            this.$parent.clickItem(event, item)
        },
        dispatchEventOnClickItem(event, item){
            event.stopPropagation()      
            this.closeVMenuItems(item.properties.vmmlID)
            if(item[this.customProps.children].length < 1)
                this.clickItem(event, item)
            else { 
                if(!this.customProps.openOnLeafOnly)
                  this.clickItem(event, item)          
                this.isClosed = !this.isClosed
                this.checkOverflowBody()      
            }
        },
        setChildrenOpenDirection(vueElement, openDirection){   
            vueElement.openDirection = openDirection           
            for(let i = 0; i < vueElement.$children.length; i++)
                this.setChildrenOpenDirection(vueElement.$children[i], openDirection)
        },
        checkOverflowBody(){
            this.$nextTick(function () {
                if(document.body.clientWidth != document.body.scrollWidth){
                    if(this.item.properties.level == 0)
                        this.rootItemPosition = 'right'
                    else {
                        this.$parent.$children.forEach((child) => {
                            this.setChildrenOpenDirection(child, 'down')
                        })
                        if(this.$parent.item)
                            this.$parent.checkOverflowBody()
                    }    
                }
            })
        },
        getStrippedStyle(){
           let parts = this.item.properties.vmmlID.split('_')
           let pos = parts.length > 0 ? parseInt(parts[parts.length -1 ]) : 0
           if(this.customProps.stripedStyle.length != 'undefined')
              return (this.customProps.stripedStyle.length > 0) ? this.customProps.stripedStyle[pos % this.customProps.stripedStyle.length] : this.customProps.stripedStyle[0]
            else
                return this.customProps.stripedStyle
        }
    },
    mounted() {  
        this.customProps.rootItemHoverStyle = Object.assign({}, this.customProps.rootItemStyle, this.customProps.rootItemHoverStyle) || []
        this.customProps.rootItemActiveStyle = Object.assign({}, this.customProps.rootItemStyle, this.customProps.rootItemActiveStyle) || []
        this.customProps.itemHoverStyle = Object.assign({}, this.customProps.itemStyle, this.customProps.itemHoverStyle) || []
        this.customProps.itemActiveStyle = Object.assign({}, this.customProps.itemStyle, this.customProps.itemActiveStyle) || []
    },
    computed:{
        containerItem: function(){
            if(this.openDirection == 'right')
                return this.customProps.containerItemsStyleRight
            else
                return this.customProps.containerItemsStyleDown
        },
        marginLeft: function(){
            if(this.item.properties.level != 0 && this.$parent.item.properties.level != 0 && this.$parent.openDirection == 'down'){
                let customPaddingLeft = typeof(this.customProps.offsetDownDirection) !== 'number' ? 0 : this.customProps.offsetDownDirection
                return (parseFloat(this.$parent.marginLeft.replace('px')) + customPaddingLeft) + 'px'
            } else
                return '0px'
        },
        itemMenuStyle: function() {
            let style = []
            if(!this.isClosed)
               style = this.item.properties.level == 0 ? this.customProps.rootItemActiveStyle : this.customProps.itemActiveStyle
            else if(this.hover){
                style = this.item.properties.level == 0 ? this.customProps.rootItemHoverStyle : this.customProps.itemHoverStyle
                this.checkOverflowBody()
            }
            else
                style = this.item.properties.level == 0 ? this.customProps.rootItemStyle :  Object.assign({}, this.customProps.itemStyle, this.getStrippedStyle())               
            return style
        },
        dropDownItemMenu: function() {       
            let classes = ''
            if(this.item.properties.level == 0)
                classes += 'root-item '
            else  
                classes += 'dropdown-item-menu '            
            return classes
        },
        dropDownMenu: function() {            
            let classes = 'dropdown-menu '
            if(this.item.properties.level == 0){
                classes += 'dropdown-menu-absolute dropdown-menu-open-down ' 
                classes += this.rootItemPosition == 'right' ? 'right-position ' : ''
            }
            else if(this.openDirection == 'down')   
                classes += 'dropdown-menu-initial dropdown-menu-open-down '
            
            else if(this.openDirection == 'right'){
                classes += 'dropdown-menu-absolute dropdown-menu-open-right ' 
            }
            if(!this.isClosed)
                classes += 'vmml-opened'

            return classes
        },
        cssIconBefore: function() {
            let _icon = ''
            if(this.item.properties.level == 0){
                _icon = this.customProps.iconRootBefore
            }
            else {
                if(this.openDirection == 'down' && this.item[this.customProps.children].length > 0){
                    _icon = this.customProps.iconDownBefore
                }     
                else if(this.openDirection == 'down' && this.item[this.customProps.children].length == 0){
                    _icon = this.customProps.iconDownBeforeLeaf
                }
                else if(this.openDirection == 'right' && this.item[this.customProps.children].length > 0){
                    _icon = this.customProps.iconRightBefore
                } 
                else if(this.openDirection == 'right' && this.item[this.customProps.children].length == 0){
                    _icon = this.customProps.iconRightBeforeLeaf
                }
            }

            if(typeof(_icon.opened) != 'undefined' && typeof(_icon.closed) != 'undefined'){
                return { 'icon' : this.isClosed ? _icon.closed.icon || '' : _icon.opened.icon || '', 'style' : this.isClosed ? _icon.closed.style  || '': _icon.opened.style || '' } 
            }    
            else{
                return {'icon' :  _icon.icon || '' , 'style' : _icon.style || '' } 
            }   
        }, 
        cssIconAfter: function() {  
            let _icon = ''
            if(this.item[this.customProps.children].length > 0){
                if(this.item.properties.level == 0){
                   _icon = this.customProps.iconRootAfter
                }
                else {
                    if(this.openDirection == 'down'){
                       _icon = this.customProps.iconDownAfter
                    }
        
                    else if(this.openDirection == 'right'){
                        _icon = this.customProps.iconRightAfter
                    }    
                }
            }
            if(typeof(_icon.opened) != 'undefined' && typeof(_icon.closed) != 'undefined'){
                return { 'icon' : this.isClosed ? _icon.closed.icon || '' : _icon.opened.icon || '', 'style' : this.isClosed ? _icon.closed.style  || '': _icon.opened.style || '' } 
            }    
            else
                return {'icon' :  _icon.icon || '' , 'style' : _icon.style || '' }           
        },      
        dropDownText: function() {           
            let classText = 'dropdown-text '

            //if(this.item.level == 0)           
            //    classText += 'text-root '

            return classText
        }
    }
}
</script>
<style scoped>

#v-menu-multi-level ul,  #v-menu-multi-level li {
    margin: 0;
    padding: 0;
    text-align: left;
}

#v-menu-multi-level .root-item {
    align-self: stretch;
    display: flex; 
    position: relative;
}

#v-menu-multi-level .root-item .dropdown-menu.right-position {
    left: auto!important;
    right: 0!important;
}

#v-menu-multi-level .dropdown-text .item-icon-before {
    align-self: center;
}

#v-menu-multi-level .dropdown-text .item-icon-after {
    align-self: center;
}

#v-menu-multi-level .dropdown-text {
    display: flex;
    align-items: flex-start;      
}

#v-menu-multi-level .dropdown-text .item-text {
    align-self: center;
    flex: 1;
}

#v-menu-multi-level .item-menu-margin-left {
    display: flex;
    align-self: center;
    width: 100%;
}

#v-menu-multi-level .dropdown-menu {
    display: none;
}

#v-menu-multi-level .dropdown-item-menu {
    display: block;
    position: relative;
}

#v-menu-multi-level .dropdown-menu.vmml-opened{
 display: block;   
}

#v-menu-multi-level .dropdown-menu-absolute {
    position: absolute;
    z-index: 1000;
    top: 100%;
}

#v-menu-multi-level .dropdown-menu-initial {
    position: initial;
}

#v-menu-multi-level .dropdown-menu-open-down {
    padding: 0;
    margin-top: 0;
}

#v-menu-multi-level .dropdown-menu-open-right {
    top: 50%;
    left: 100%;
    padding: 0;
    margin-top: 0;
    margin-left: -1px;
}

</style>