import { AppMessagesProvider } from './../../providers/app-messages/app-messages';
import { Item } from './../../shared/model/item';
import { Observable } from 'rxjs/Observable';
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    userProfile: any;
    items$: Observable<Item[]>;

    constructor(public navCtrl: NavController, private itemProvider: ItemProvider, private alertCtrl: AlertController
        , private messagesPvdr: AppMessagesProvider) {
        /*

        private storage: Storage,  

        this.storage.get('userProfile').then(profile => {
            console.log('get>>> ' + profile);
            this.userProfile = JSON.parse(profile); 
            //console.log('userProfile >>>>>' + JSON.stringify(this.userProfile));
        });
          */

        this.items$ = itemProvider.listItems();
        this.items$.subscribe(console.log);
    }

    removeItem(item: any) {
        console.log(item);
        this.itemProvider.removeItem(item).subscribe(data=>{
            console.log('removido com sucesso.')
            this.messagesPvdr.alert({message: 'Item removido com sucesso'});
        }, error => {
            console.error('Erro: ', error);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

}
