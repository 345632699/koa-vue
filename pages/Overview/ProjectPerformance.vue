<template>
    <div class="overview_wrap">
       <div id="viewDiv" class="viewDiv"></div>
       <BottomCompose class="bottom-menu" @selectFetureChange="selectFetureChange"/>
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
      roadFeature: Object,
      map: Object
    }
  },
  components: {
    TargetAndPresent,
    BottomCompose
  },
  mounted () {
    console.log('map: mounted')
    loadModules(['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer', 'esri/config',
      'esri/dijit/PopupTemplate',
      'esri/InfoTemplate',
      'esri/symbols/SimpleFillSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/tasks/IdentifyTask',
      'esri/tasks/IdentifyParameters',
      'esri/dijit/Popup',
      'dojo/_base/array',
      'esri/Color',
      'dojo/dom-construct',
      'dojo/domReady!'], {
      // use a specific version instead of latest 4.x
      url: 'http://10.96.153.231:8999/arcgis_js_api/library/3.24/3.24/init.js'
    }).then(([EsriMap, ArcGISDynamicMapServiceLayer, esriConfig, PopupTemplate, InfoTemplate, SimpleFillSymbol,
      SimpleLineSymbol, IdentifyTask, IdentifyParameters, Popup,
      arrayUtils, Color, domConstruct]) => {
      // esriConfig.request.corsEnabledServers.push('10.96.153.231:8999')
      // create map with the given options at a DOM node w/ id 'mapNode'
      var identifyTask, identifyParams
      // var popup = new Popup({
      //   fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
      //     new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
      //       new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
      // }, domConstruct.create('div'))

      var popup2 = new PopupTemplate({
        title: '{NAME}',
        description: '<b>{NAME}</b> 目标数据与现状',
        fieldInfos: [{ // define field infos so we can specify an alias
          fieldName: 'OBJECTID',
          label: 'OBJECTID'
        }, {
          fieldName: 'KIND',
          label: 'KIND'
        }],
        mediaInfos: [{ // define the bar chart
          caption: '',
          type: 'piechart',
          value: {
            theme: 'Dollar',
            fields: ['OBJECTID', 'KIND']
          }
        }]
      })

      this.map = new EsriMap('viewDiv', {
        basemap: 'streets',
        zoom: 12, // Sets zoom level based on level of detail (LOD)
        center: [114.149314, 22.624836], // Sets center point of view using longitude,latitude
        infoTemplate: popup2
      })

      // points to the states layer in a service storing U.S. census data
      // const fl = new FeatureLayer({
      //   url: 'https://10.96.153.158:6443/arcgis/rest/services/BottleMapService/MapServer/0'
      // })
      // this.map.add(fl) // adds the layer to the map
      var f1 = 'https://10.96.153.158:6443/arcgis/rest/services/BottleMapService/MapServer'
      this.map.addLayer(new ArcGISDynamicMapServiceLayer(f1,
        { opacity: 0.55 }))

      var parcelsURL = 'https://10.96.153.158:6443/arcgis/rest/services/RoadMapService/MapServer'
      this.map.addLayer(new ArcGISDynamicMapServiceLayer(parcelsURL,
        { opacity: 0.55 }))
      // this.roadFeature = new FeatureLayer({url: 'https://10.96.153.158:6443/arcgis/rest/services/RoadMapService/MapServer'})
      // this.map.add(this.roadFeature)

      this.map.on('load', mapReady)

      // var view = new SceneView({
      //   container: 'viewDiv', // Reference to the scene div created in step 5
      //   map: this.map, // Reference to the map object created before the scene
      //   zoom: 12, // Sets zoom level based on level of detail (LOD)
      //   center: [114.149314, 22.624836] // Sets center point of view using longitude,latitude
      // })

      // view.ui.empty('top-left')
      // var zoom = new Zoom({ view: view })
      // view.ui.add(zoom, 'bottom-left')
      // view.ui.padding = { top: 500, left: 0, right: 0, bottom: 0 }
      // console.log(view)

      let that = this
      function mapReady () {
        that.map.on('click', executeIdentifyTask)
        // create identify tasks and setup parameters
        identifyTask = new IdentifyTask(parcelsURL)

        identifyParams = new IdentifyParameters()
        identifyParams.tolerance = 3
        identifyParams.returnGeometry = true
        identifyParams.layerIds = [0, 2]
        identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL
        identifyParams.width = that.map.width
        identifyParams.height = that.map.height
      }
      function executeIdentifyTask (event) {
        identifyParams.geometry = event.mapPoint
        identifyParams.mapExtent = that.map.extent

        var deferred = identifyTask
          .execute(identifyParams)
          .addCallback(function (response) {
            // response is an array of identify result objects
            // Let's return an array of features.
            return arrayUtils.map(response, function (result) {
              var feature = result.feature
              var layerName = result.layerName

              feature.attributes.layerName = layerName
              // if (layerName === 'Tax Parcels') {
              //   var taxParcelTemplate = new InfoTemplate('',
              //     '${Postal Address} <br/> Owner of record: ${First Owner Name}')
              //   feature.setInfoTemplate(taxParcelTemplate)
              // } else if (layerName === 'Building Footprints') {
              //   console.log(feature.attributes.PARCELID)
              //   var buildingFootprintTemplate = new InfoTemplate('', 'Parcel ID: ${PARCELID}')
              //   feature.setInfoTemplate(buildingFootprintTemplate)
              // }
              return feature
            })
          })

          // InfoWindow expects an array of features from each deferred
          // object that you pass. If the response from the task execution
          // above is not an array of features, then you need to add a callback
          // like the one above to post-process the response and return an
          // array of features.
        that.map.infoWindow.setFeatures([deferred])
        that.map.infoWindow.show(event.mapPoint)
      }
    })
  },
  methods: {
    setRightBarCollapse (val) {
      this.isCollapse = val
    },
    selectFetureChange (val) {
      console.log('selectFetureChange...', val, this.roadFeature)
      if (val === false) {
        this.roadFeature.visible = false
      } else {
        this.roadFeature.visible = true
      }
    }
  },
  beforeDestroy () {
    console.log('map: beforeDestroy')
    this.$store.commit('removeatchHandle')
  }
}
</script>

<style scoped>
@import url("http://10.96.153.231:8999/arcgis_js_api/library/3.24/3.24/esri/css/esri.css");

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
.esri-ui-top-left {
  left: 160;
}
.esri-ui-corner {
  position: relative;
}
</style>