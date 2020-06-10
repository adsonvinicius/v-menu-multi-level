<template>
  <div id="app">
    <v-menu-multi-level
        align="center"
        children="children"
        label="label"
        open-direction="right"
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
        :offset-down-direction="15"
        :root-item-active-style="rootItemActiveStyle" 
        :root-item-hover-style="rootItemHoverStyle" 
        :root-item-style="rootItemStyle" 
 
        :striped-style="stripedStyle" 
        @clickitem="clickItem">

        <template v-slot:prepend>
              <div class="profile"><span>World Cities</span></div>
        </template>

        <template v-slot:append>
              <div class="user-info">
                <span>Adson Damasceno</span>
                <span>v-menu-multi-level</span>
              </div>
        </template>
        
      </v-menu-multi-level>
  </div>
</template>

<script>
import reports from './../drafts/reports.json'
import VMenuMultiLevel from './components/v-menu-multi-level'

export default {
  name: 'App',
  components: {
    VMenuMultiLevel
  },
  data(){
    return {
      nodes: [{"label":"North America","children":[{"label":"United States","children":[{"label":"California","children":[{"label":"Los Angeles","children":[{"label":"Hollywood","children":[]},{"label":"Santa Monica","children":[]},{"label":"Beverly Hills","children":[]}]},{"label":"San Diego","children":[{"label":"city","children":[]}]},{"label":"San Francisco","children":[{"label":"city","children":[]}]}]},{"label":"Hawaii","children":[{"label":"city","children":[]}]},{"label":"New York","children":[{"label":"city","children":[]}]},{"label":"Texas","children":[{"label":"city","children":[]}]}]},{"label":"Canada","children":[{"label":"Alberta","children":[]}]}]},{"label":"South America","children":[{"label":"city","children":[]}]},{"label":"Europe","children":[{"label":"city","children":[]}]},{"label":"Asia","children":[{"label":"city","children":[]}]},{"label":"Oceania","visible":false,"children":[{"label":"city","children":[]}]}],
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
          icon: '<i class="fa fa-map-marker" aria-hidden="true"></i>', 
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
    
    getChildren(data, id) {
        let node = null;
        let _self = this;
        data.forEach(function(k){
            if (k.extra.id == id) {
                node = k;
            }
            else if (!node && k.children && k.children.length > 0) {
                node = _self.getChildren(k.children, id);
            }
        });
        return node;
    },
    generateTreeNode(id, path) {
        var node = [];
        let _self = this;
        reports.forEach(function(j){
            var item_path = j.pathField.split('/');
            if (item_path.length > 1) {
                let parent_path = item_path.slice(0, item_path.length - 1).join('/');
                if (parent_path.toLowerCase() == path.toLowerCase() && j.idField != id) {
                    node.push({
                        'label': j.nameField, 
                        'children': _self.generateTreeNode(j.idField, j.pathField),
                        'extra': {
                          'path': j.pathField,
                          'type': j.typeNameField,
                          'id': j.idField,
                          'description': j.descriptionField
                        }
                    });
                }
            }
        });
        return node;
    }
  },
  mounted(){
    let temp = [];
    let _self = this;
    reports.forEach(function(j){
        if (_self.getChildren(temp, j.idField) == null) {
          let item = {
            'label': j.nameField,
            'extra': {
                'path': j.pathField,
                'type': j.typeNameField,
                'id': j.idField,
                'description': j.descriptionField
            }
          }
          item.children = j.typeNameField != 'Folder' ? [] : _self.generateTreeNode(j.idField, j.pathField);
          temp.push(item);
        }
    });

    //this.nodes.forEach(function(k){
    //  try {
          //let item = temp.find(item => item.label == k.label);
          //k.children = item ? item.children : [];
    //  } catch(ex) {
    //      console.log(ex);
    //  }
    //});
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}

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
</style>
