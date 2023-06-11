package com.example.trafficfeed.data

import android.content.Context
import com.example.trafficfeed.model.TrafficNotification
import com.example.trafficfeed.util.JsonUtils
import org.json.JSONObject

class DataSource {
    fun loadTrafficNotifications(appContext: Context): List<TrafficNotification> {
        val json: JSONObject = JsonUtils.loadJSONFromAsset(appContext, "notifications.json")
        return JsonUtils.parseJSON(json)
    }
}