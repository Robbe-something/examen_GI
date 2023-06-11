package com.example.trafficfeed.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import com.example.trafficfeed.data.DataSource
import com.example.trafficfeed.data.TrafficUiState
import com.example.trafficfeed.model.TrafficNotification
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class TrafficViewModel(application: Application) : AndroidViewModel(application) {
    private val trafficNotifications = DataSource().loadTrafficNotifications(application.applicationContext)
    private val _uiState = MutableStateFlow(
        TrafficUiState(
            trafficNotificationsToShow = trafficNotifications
        )
    )

    val uiState: StateFlow<TrafficUiState> = _uiState.asStateFlow()

    fun updateSearchText(text: String) {
        _uiState.update { currentState ->
            currentState.copy(
                searchText = text
            )
        }
    }

    fun updateTrafficNotificationsToShow(){
        _uiState.update{currentState ->
            currentState.copy(
                trafficNotificationsToShow = trafficNotifications.filter { trafficNotification ->
                    trafficNotification.name.contains(_uiState.value.searchText)
                }
            )
        }
    }

    fun updateSelectedTrafficNotification(notification: TrafficNotification){
        _uiState.update{currentState ->
            currentState.copy(
                selectedTrafficNotification = notification
            )
        }
    }

}