package com.example.trafficfeed.data

import com.example.trafficfeed.model.TrafficNotification

data class TrafficUiState(
    val searchText: String = "",
    val trafficNotificationsToShow: List<TrafficNotification> = listOf(),
    val selectedTrafficNotification: TrafficNotification? = null
)