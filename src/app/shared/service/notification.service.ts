import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Notification } from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private apiservice: ApiService){}

  public getAllNotifications(): Notification[] {
    return [
      {
        type: 'request',
        title: 'Verzoek ruimte overnemen',
        message: 'Gebruiker a wil vergaderruimte R0634 overnemen.',
        date: new Date()
      },
      {
        type: 'warning',
        title: 'Onbezochte reservering',
        message: 'U bent op maandag 29-04-2024 niet naar uw reservering geweest.',
        date: new Date()
      },
      {
        type: 'success',
        title: 'Reservering geplaatst',
        message: 'U heeft succesvol een reservering voor ruimte R0634 geplaatst.',
        date: new Date()
      }
    ]

    //TODO: Connect with API to get all notifications
  }
}