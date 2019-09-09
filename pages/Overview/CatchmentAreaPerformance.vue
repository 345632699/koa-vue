<template>
    <div class="overview_wrap">
       <div id="viewDiv" class="viewDiv"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader'
export default {
  //   async asyncData () {
  //     let { userdata } = await axios.get('/api/users')
  //     return { users: userdata }
  //   },
  data () {
    return {
      name: 'client'
    }
  },
  mounted () {
    console.log('map: mounted')
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/config'], {
      // use a specific version instead of latest 4.x
      url: 'http://10.96.153.231:8999/arcgis_js_api/library/4.7/init.js'
    }).then(([EsriMap, SceneView, FeatureLayer, esriConfig]) => {
      esriConfig.request.corsEnabledServers.push('10.96.153.231:8999')
      // create map with the given options at a DOM node w/ id 'mapNode'
      var map = new EsriMap({
        basemap: 'streets'
      })

      // points to the states layer in a service storing U.S. census data
      const fl = new FeatureLayer({
        url: 'https://10.96.153.158:6443/arcgis/rest/services/bgjd/MapServer'
      })
      map.add(fl) // adds the layer to the map

      var view = new SceneView({
        container: 'viewDiv', // Reference to the scene div created in step 5
        map: map, // Reference to the map object created before the scene
        zoom: 12, // Sets zoom level based on level of detail (LOD)
        center: [114.149314, 22.624836] // Sets center point of view using longitude,latitude
      })

      console.log(view)
    })
  },
  beforeDestroy () {
  }
}
</script>

<style scoped>
@import url("http://10.96.153.231:8999/arcgis_js_api/library/4.7/esri/css/main.css");

.overview_wrap {
  background-color: #253337;
}
.viewDiv {
  height: 1000px;
  width: 100%;
}
</style>