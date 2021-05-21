import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 0,
      name: '',
      status: 'éteint'
    }];

  constructor(private httpClient: HttpClient) {}

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll(): void{
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }
  switchOffAll(): void {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }
  
  switchOnOne(index: number): void {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }
  switchOffOne(index: number): void {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  // findAppareilForDelete(id: number) {
  //   const appareilToDelete = this.getAppareilById(id);
  //   return appareilToDelete;
  // }

  deleteAppareil(id: number): void {
    const appareilTodel = this.getAppareilById(id);
    this.appareils.forEach(
      (item, index) => {
        if(item === appareilTodel) this.appareils.splice(index, 1);
      }
    );
    this.emitAppareilSubject();
  }

  saveAppareilsToServer() {
    this.httpClient
              .put('https://monprojetangular-f06e3-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
              .subscribe(
                () => {
                  console.log('Enregistrement terminé !');
                },
                (error) => {
                  console.log('Erreur de sauvegarde !' + error);
                }
              );
  }

   getAppareilsFromServer() {
     this.httpClient
               .get<any[]>('https://monprojetangular-f06e3-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
               .subscribe(
                 (response) => {
                     this.appareils = response;
                     this.emitAppareilSubject();
                 },
                 (error) => {
                   console.log('Erreur de chargement !' + error)
                 }
               );
   }

   deleteAppareilFromServer() {
     this.httpClient.delete('https://monprojetangular-f06e3-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', )
   }

}
