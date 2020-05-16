import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JugadoresPage } from './jugadores.page';

describe('JugadoresPage', () => {
  let component: JugadoresPage;
  let fixture: ComponentFixture<JugadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JugadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
