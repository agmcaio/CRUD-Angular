import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface Compromisso {
  compromisso: string;
  id: number;
  local: string;
  data: string;
}

const ELEMENT_DATA: Compromisso[] = [
  {id: 1, compromisso: 'Aula', local: 'IFPB', data: '20/09/2023'},
  {id: 2, compromisso: 'Ler', local: 'Casa', data: '04/10/2023'},
  {id: 3, compromisso: 'Resolver Task', local: 'Trabalho', data: '05/11/2023'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['demo-id', 'demo-compromisso', 'demo-local', 'demo-data', 'demo-action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit() : void {}

  openDialog(element: Compromisso | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      data: element === null ? {
        id: null,
        compromisso: '',
        local: '',
        data: '' 
      } : {
        id: element.id,
        compromisso: element.compromisso,
        local: element.local,
        data: element.data 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result)
        const index = this.dataSource.findIndex(item => item.id === result.id)

        if(index !== -1){
          this.dataSource[index] = result
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  editElement(element: Compromisso): void{
    this.openDialog(element);
  }

  deleteElement(id:number): void{
    this.dataSource = this.dataSource.filter(i => i.id !== id);
  }
}
