package com.example.trafficfeed.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.trafficfeed.data.DataSource
import com.example.trafficfeed.data.TrafficNotificationDatabase
import com.example.trafficfeed.data.TrafficNotificationRepository
import com.example.trafficfeed.data.TrafficUiState
import com.example.trafficfeed.model.TrafficNotification
import com.example.trafficfeed.util.JsonUtils
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import org.json.JSONObject

@OptIn(DelicateCoroutinesApi::class)
class TrafficViewModel(application: Application) : AndroidViewModel(application) {
    private lateinit var repo: TrafficNotificationRepository
    private val _uiState = MutableStateFlow(
        TrafficUiState()
    )
    private lateinit  var trafficNotifications: List<TrafficNotification>

    init {
        viewModelScope.launch {
            launch(newSingleThreadContext("DatabaseThread")){
                repo = TrafficNotificationRepository(
                    TrafficNotificationDatabase.getDatabase(application.applicationContext)
                        .trafficNotificationDao()
                )

                val json: JSONObject = JsonUtils.loadJSONFromAsset(
                    application.applicationContext,
                    "notifications.json"
                )
                repo.insertAll(JsonUtils.parseJSON(json))

                repo.getAllStream().collect() {notifications ->
                    trafficNotifications = notifications
                    updateTrafficNotificationsToShow()
                }
            }
        }
    }

    val uiState: StateFlow<TrafficUiState> = _uiState.asStateFlow()

    fun updateSearchText(text: String) {
        _uiState.update { currentState ->
            currentState.copy(
                searchText = text
            )
        }
    }

    fun updateTrafficNotificationsToShow() {
        _uiState.update { currentState ->
            currentState.copy(
                trafficNotificationsToShow = trafficNotifications.filter { trafficNotification ->
                    trafficNotification.name.contains(_uiState.value.searchText)
                }
            )
        }
    }

    fun updateSelectedTrafficNotification(notification: TrafficNotification) {
        _uiState.update { currentState ->
            currentState.copy(
                selectedTrafficNotification = notification
            )
        }
    }

}