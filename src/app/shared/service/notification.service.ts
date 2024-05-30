import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Notification } from "../model/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private apiservice: ApiService){}

  public getAllNotifications(): Notification[] {
    return [
      new Notification('testId1', 'request', 'Verzoek ruimte overnemen', 'Gebruiker a wil vergaderruimte R0634 overnemen.', new Date()),
      new Notification('testId2', 'warning', 'Onbezochte reservering', 'U bent op maandag 29-04-2024 niet naar uw reservering geweest.', new Date()),
      new Notification('testId3', 'warning', 'Onbezochte reservering', 'U bent op vrijdag 31-05-2024 niet naar uw reservering geweest.', new Date()),
    ]
    //TODO: Connect with API to get all notifications
  }
}