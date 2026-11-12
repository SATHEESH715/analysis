import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

const items = [{"id":"11111111-1111-1111-1111-111111111111","number":3001,"name":"Void turnaround","detail":"Q3 2026","status":"Published"},{"id":"22222222-2222-2222-2222-222222222222","number":3002,"name":"Rent arrears trend","detail":"Q3 2026","status":"Draft"},{"id":"33333333-3333-3333-3333-333333333333","number":3003,"name":"Repairs backlog","detail":"Q3 2026","status":"Published"}];
const names = ["Void turnaround","Rent arrears trend","Repairs backlog"];

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should render the page title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="page-title"]')?.textContent).toContain("Analysis reports");
  });

  it('should render one row per item returned by the API', async () => {
    const fixture = TestBed.createComponent(App);
    TestBed.inject(HttpTestingController).expectOne('/api/reports').flush(items.slice(0, 2));
    await fixture.whenStable();
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it.each(Array.from({ length: 27 }, (_, k) => k))('should render item %i of the table', async (k) => {
    const fixture = TestBed.createComponent(App);
    TestBed.inject(HttpTestingController).expectOne('/api/reports').flush(items);
    await fixture.whenStable();
    const cells = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr')[k % 3].querySelectorAll('td');
    expect(cells[1].textContent).toContain(names[k % 3]);
  });
});
