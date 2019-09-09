<template>
    <div class="overview_wrap">
       <div id="viewDiv" class="viewDiv"></div>
       <BottomCompose class="bottom-menu"/>
       <div v-bind:class="isCollapse?'collapse_rightpanel':'open_rightpanel'">
         <TargetAndPresent @getRightBarCollapse="setRightBarCollapse"/>
       </div>
    </div>
</template>

<script>
import TargetAndPresent from './TargetAndPresent.vue'
import BottomCompose from './BottomCompose.vue'
import { loadModules } from 'esri-loader'
export default {
  //   async asyncData () {
  //     let { userdata } = await axios.get('/api/users')
  //     return { users: userdata }
  //   },
  data () {
    return {
      name: 'client',
      isCollapse: true,
      districts: [],
      lastDistrict: null
    }
  },
  components: {
    TargetAndPresent,
    BottomCompose
  },
  mounted () {
    let that = this
    console.log('map: mounted')
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/config', 'esri/Graphic', 'esri/widgets/Zoom', 'dojo/domReady!'], {
      // use a specific version instead of latest 4.x
      url: 'http://10.96.153.231:8999/arcgis_js_api/library/4.7/init.js'
    }).then(([EsriMap, SceneView, FeatureLayer, esriConfig, Graphic, Zoom]) => {
      esriConfig.request.corsEnabledServers.push('10.96.153.231:8999')
      // create map with the given options at a DOM node w/ id 'mapNode'
      var map = new EsriMap({
        basemap: 'streets'
      })

      // const fl = new FeatureLayer({
      //   url: 'https://10.96.153.158:6443/arcgis/rest/services/demo_area/FeatureServer'
      // })
      // map.add(fl) // adds the layer to the map

      var featureLayer = new FeatureLayer({
        url: 'https://10.96.153.158:6443/arcgis/rest/services/demo_area/FeatureServer',
        outFields: ['*'],
        popupTemplate: {
          title: '{name}',
          actions: [{
            id: 'find-brewery',
            image: `url('~assets/img/huachi.png')`,
            title: 'Brewery Info'
          }],
          content: [{
            type: 'fields',
            fieldInfos: [{
              fieldName: 'name'
            }, {
              fieldName: 'address1',
              label: 'address'
            }, {
              fieldName: 'city'
            }, {
              fieldName: 'state'
            }, {
              fieldName: 'phone'
            }, {
              fieldName: 'website'
            }]
          }]
        }
      })

      map.add(featureLayer)

      var view = new SceneView({
        container: 'viewDiv', // Reference to the scene div created in step 5
        map: map, // Reference to the map object created before the scene
        zoom: 12, // Sets zoom level based on level of detail (LOD)
        center: [114.149314, 22.624836] // Sets center point of view using longitude,latitude
      })

      view.when(function () {
        // Watch for when features are selected
        view.popup.watch('selectedFeature', function (graphic) {
          if (graphic) {

          }
        })
      })
      view.on('pointer-move', function (event) {
        var screenPoint = {
          x: event.x,
          y: event.y
        }

        // Search for graphics at the clicked location
        view.hitTest(screenPoint).then(function (response) {
          if (response.results.length) {
            var graphic = response.results.filter(function (result) {
              return true
            })[0].graphic
            // do something with the result graphic
            if (graphic) {
              console.log('graphic..', graphic)
              let isExist = false
              if (that.lastDistrict && graphic.attributes.OBJECTID !== that.lastDistrict.ObjectId) {
                console.log('this.lastDistrict..', that.lastDistrict)
                that.lastDistrict.polylineGraphic.visible = false
              }

              let i = 0
              for (i = 0; i < that.districts.length; i++) {
                console.log('that.districts..', that.districts)
                if (graphic.attributes.OBJECTID === that.districts[i].ObjectId) {
                  console.log('graphic.attributes.OBJECTID..', graphic.attributes.OBJECTID)
                  that.districts[i].polylineGraphic.visible = true
                  that.lastDistrict = that.districts[i].polylineGraphic
                  isExist = true

                  break
                }
              }

              if (!isExist) {
                let polylineSymbol = {
                  type: 'simple-line', // autocasts as SimpleLineSymbol()
                  color: [226, 119, 40],
                  width: 4
                }

                let polylineAtt = {
                  Name: 'Keystone Pipeline',
                  Owner: 'TransCanada'
                }

                let polylineGraphic = new Graphic({
                  geometry: graphic.geometry,
                  symbol: polylineSymbol,
                  attributes: polylineAtt
                })

                let newDistrict = {}
                newDistrict.ObjectId = graphic.attributes.OBJECTID
                newDistrict.polylineGraphic = polylineGraphic
                console.log('isExist..', isExist)
                that.districts.push(newDistrict)
                that.lastDistrict = newDistrict
                view.graphics.add(polylineGraphic)
                that.lastDistrict.polylineGraphic.visible = false

                console.log('newDistrictt..', newDistrict)
              }
            }
          }
        })
      })
      // view.on('click', function (event) {
      //   var polyline = {
      //     type: 'polyline', // autocasts as new Polyline()
      //     paths: [
      //       [-111.30, 52.68],
      //       [-98, 49.5],
      //       [-93.94, 29.89]
      //     ]
      //   }

      //   var polylineSymbol = {
      //     type: 'simple-line', // autocasts as SimpleLineSymbol()
      //     color: [226, 119, 40],
      //     width: 4
      //   }

      //   // var polylineAtt = {
      //   //   Name: 'Keystone Pipeline',
      //   //   Owner: 'TransCanada'
      //   // }

      //   var polylineGraphic = new Graphic({
      //     geometry: polyline,
      //     symbol: polylineSymbol
      //     // attributes: polylineAtt
      //   })
      //   view.graphics.add(polylineGraphic)
      //   console.log(polylineGraphic)
      // })
      // view.when(function () {
      //   // Watch for when features are selected
      //   view.popup.watch('selectedFeature', function (graphic) {
      //     if (graphic) {
      //       // Set the action's visible property to true if the 'website' field value is not null, otherwise set it to false
      //       graphic.popupTemplate.actions.items[0].visible =
      //         !!graphic.attributes.website
      //     }
      //   })
      // })
      // view.when(function () {
      //   var popup = view.popup
      //   popup.viewModel.on('trigger-action', function (event) {
      //     if (event.action.id === 'find-brewery') {
      //       var attributes = popup.viewModel.selectedFeature.attributes
      //       // Get the 'website' field attribute
      //       var info = attributes.website
      //       // Make sure the 'website' field value is not null
      //       if (info) {
      //         // Open up a new browser using the URL value in the 'website' field
      //         window.open(info.trim())
      //       }
      //     }
      //   })
      // })
      // view.ui.empty('top-left')
      // var zoom = new Zoom({ view: view })
      // view.ui.add(zoom, 'bottom-left')
      // view.ui.padding = { top: 500, left: 0, right: 0, bottom: 0 }
      console.log(view)
    })
  },
  methods: {
    setRightBarCollapse (val) {
      this.isCollapse = val
    }
  },
  beforeDestroy () {
    console.log('map: beforeDestroy')
    this.$store.commit('removeatchHandle')
  }
}
</script>

<style scoped>
.overview_wrap {
  background-color: #253337;
}
.viewDiv {
  height: 100vh;
  width: 100%;
}
.collapse_rightpanel {
  width: 15px;
  height: 100%;
  background: #152025;
  right: 0;
  border: 0px;
  position: fixed;
}
.open_rightpanel {
  width: 460px;
  height: 100%;
  overflow-y:auto;
  overflow-x:hidden;
  background: #152025;
  border: 0px;
  right: 0;
  top:46px;
  position: fixed;
}
 /* for Chrome */
.open_rightpanel::-webkit-scrollbar {
    display: none;
}
.bottom-menu {
  bottom: 0px;
  position: fixed;
}
</style>
<style>
@import url("http://10.96.153.231:8999/arcgis_js_api/library/4.7/esri/css/main.css");
.esri-ui-top-left {
  left: 160;
}
.esri-ui-corner {
  position: relative;
}
</style>