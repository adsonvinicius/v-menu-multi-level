<template>
  <div id="app">
    <v-menu-multi-level
        align="top"
        children="children"
        label="label"
        open-direction="down"
        root-item-position="left"
        :item-active-style="itemActiveStyle"
        :container-items-style-down="containerItemsStyleDown" 
        :container-items-style-right="containerItemsStyleRight" 
        :icon-down-after="iconDownAfter" 
        :icon-down-before="iconDownBefore" 
        :icon-down-before-leaf="iconDownBeforeLeaf" 
        :icon-root-after="iconRootAfter" 
        :icon-root-before="iconRootBefore" 
        :icon-right-after="iconRightAfter"  
        :icon-right-before="iconRightBefore" 
        :icon-right-before-leaf="iconRightBeforeLeaf" 
        :ignore-sort-root-items="false"
        :item-hover-style="itemHoverStyle" 
        :item-style="itemStyle" 
        :keep-opened="false"
        :nodes="nodes"
        :open-on-leaf-only ="true"
        :offset-down-direction="20"
        :root-item-active-style="rootItemActiveStyle" 
        :root-item-hover-style="rootItemHoverStyle" 
        :root-item-style="rootItemStyle" 
        :striped-style="stripedStyle" 
        @click-item="clickItem">

        <template v-slot:prepend>
              <div class="profile"><span>v-menu-multi-level</span></div>
        </template>

        <template v-slot:append>
              <div class="user-info">
                <span><i>Developed by</i></span>
                <span><i>Adson Vinicius</i></span>
              </div>
        </template>
        
      </v-menu-multi-level>
  </div>
</template>

<script>
import VMenuMultiLevel from './components/v-menu-multi-level'

export default {
  name: 'App',
  components: {
    VMenuMultiLevel
  },
  data(){
    return {
      nodes: [],
      iconRootBefore : {
          opened: { icon: '', style: '' },
          closed: { icon: '', style: '' }  
      },
      iconRootAfter : {
          opened: {
              icon: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
              style: {
                  fontSize: '12px',
                  top: '0em',
                  position: 'relative',
                  marginLeft: '.8em',                           
                  webkitTransform: 'rotate(270deg)',
                  transform: 'rotate(270deg)',
                  transition: 'transform 0.3s, -webkit-transform 0.3s'
              }
          },
          closed: {
              icon: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
              style: { 
                  fontSize: '12px',
                  top: '0em',
                  position: 'relative',
                  marginLeft: '.8em',
                  webkitTransform: 'rotate(90deg)',
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.3s, -webkit-transform 0.3s' 
              }
          }
      },
      iconDownBefore : {
          opened: {
              icon: '<i class="fa fa-folder-open" aria-hidden="true"></i>',
              style: { 
                  fontSize: '12px',  marginLeft: '0', marginRight: '.8em'  
              }                   
          },
          closed: { 
              icon:'<i class="fa fa-folder" aria-hidden="true"></i>', 
              style: { 
                  fontSize: '12px', marginLeft: '0', marginRight: '.8em'
              }
          }
      },
      iconDownBeforeLeaf : {
          icon: '<i class="fa fa-file-o" aria-hidden="true"></i>', 
          style: { 
              fontSize: '12px', marginLeft: '0', marginRight: '.8em' 
          } 
      },
      iconDownAfter : {
          opened: { 
              icon:'<i class="fa fa-minus-square" aria-hidden="true"></i>',
              style: { 
                  fontSize: '15px', marginLeft: '.8em', marginRight: '.1em' 
              } 
          },
          closed: { 
              icon:'<i class="fa fa-plus-square" aria-hidden="true"></i>',
              style: { fontSize: '15px', marginLeft: '.8em', marginRight: '.1em' }
          }
      },
      iconRightBefore : {
          opened: { 
              icon: '<i class="fa fa-folder-open" aria-hidden="true"></i>', 
              style: { 
                  fontSize: '12px', marginLeft: '0', marginRight: '.8em' 
              }  
          },
          closed: { 
              icon: '<i class="fa fa-folder" aria-hidden="true"></i>', 
              style: { 
                  fontSize: '12px', marginLeft: '0', marginRight: '.8em' 
              } 
          },
      },
      iconRightBeforeLeaf : {
          icon: '<i class="fa fa-map-marker" aria-hidden="true"></i>', 
          style: { fontSize: '12px', marginLeft: '0', marginRight: '.8em'} 
      },
      iconRightAfter : {
          opened: { 
              icon: '<i class="fa fa-chevron-down" aria-hidden="true"></i>', 
              style: { 
                  fontSize: '12px', 
                  marginLeft: '.8em',
                  marginRight: '.3em',
                  webkitTransform: 'rotate(90deg)',
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.3s, -webkit-transform 0.3s'
                } 
          },
          closed: { 
              icon: '<i class="fa fa-chevron-down" aria-hidden="true"></i>', 
              style: { 
                  fontSize: '12px', 
                  marginLeft: '.8em',
                  marginRight: '.3em',
                  webkitTransform: 'rotate(-90deg)',
                  transform: 'rotate(-90deg)',
                  transition: 'transform 0.3s, -webkit-transform 0.3s'
              } 
          },
      }, 
      rootItemStyle: {
          backgroundColor: '#f9f9f9',
          color: '#555',
          textAlign: 'center',
          fontSize: '14px',
          padding: '.3em 2em .3em 2em',
          fontfamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'  
      },
      rootItemActiveStyle: {
          color: '#fff',
          background: 'rgba(75, 75, 75, 0.8)',
          boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.3)'
      },
      rootItemHoverStyle: {
          backgroundColor: '#e7e7e7',
      },
      containerItemsStyleDown: {
          border: 'solid 1px #d9d9d9',
      },
      containerItemsStyleRight: {
          border: 'solid 1px #d9d9d9',
      },
      itemStyle:{
          padding: '6px 10px 6px 10px',
          backgroundColor: '#f5f5f5',
          color: '#555',
          fontSize: '14px',
          minWidth: '15em',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'         
      },
      stripedStyle: [
          {
              backgroundColor: '#f5f5f5',
              color: '#555'
          },
          {
              backgroundColor: '#fff',
              color: '#555'
          }              
      ],
      itemHoverStyle: {
          backgroundColor: '#e7e7e7',
          color: '#555',
      },            
      itemActiveStyle: {
          color: '#fff',
          background: 'rgba(75, 75, 75, 0.8)',
          boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.3)'
      } 
    }
  },
  methods:{
    clickItem(event, item){
      console.log(item.label); 
    },

    sortItems(a, b){
      return b.label.localeCompare(a.label); 
    },
    generate(labels, children){
        var n = [];
        for(let x = 0; x < labels.length; x++)
            n.push({'label': labels[x], children: children});
        return n;	
    }
  },
  mounted(){  
    let labels0 = ['Level_Root_1','Level_Root_2','Level_Root_3','Level_Root_4','Level_Root_5']
    let labels1 = ['Level_1','Level_2','Level_3','Level_4','Level_5']
    let labels2 = ['Sub_Level_1','Sub_Level_2','Sub_Level_3','Sub_Level_4','Sub_Level_5']
    let labels3 = ['Sub_Sub_Level_1','Sub_Sub_Level_2','Sub_Sub_Level_3','Sub_Sub_Level_4','Sub_Sub_Level_5']
    let labels4 = ['Sub_Sub_Sub_Level_1','Sub_Sub_Sub_Level_2','Sub_Sub_Sub_Level_3','Sub_Sub_Sub_Level_4','Sub_Sub_Sub_Level_5']
    this.nodes = this.generate(labels0, this.generate(labels1, this.generate(labels2, this.generate(labels3, this.generate(labels4, [])))));
  }
}
</script>

<style>
body{
    margin: 0;
    padding: 0;
}
/*

.profile {
    color: #555!important;
    font-weight: bold;
    padding: 15px 15px;
    font-size: 18px;
    text-align: center;
}

.user-info {
  display: block;
  padding: 10px 15px;
}

.user-info span {
  display: block;
  text-align: right;
}

*/

.profile {
    color: #555!important;
    font-weight: bold;
    padding: 15px 15px;
    font-size: 18px;
    text-align: center;
}

.user-info {
  display: block;
  padding: 10px 15px;
}

.user-info span {
  display: block;
  text-align: center;
}
</style>
