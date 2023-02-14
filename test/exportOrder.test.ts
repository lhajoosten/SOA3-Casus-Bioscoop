import * as fs from "fs";
import { ExportToJSON } from "../src/Functions/ExportOrder/exportToJSON";
import { ExportToText } from "../src/Functions/ExportOrder/exportToPlainText";
import { CustomerType, TicketExportType } from "../src/Models/enumTypes";
import { Movie } from "../src/Models/movie.model";
import { MovieScreening } from "../src/Models/moviescreening.model";
import { MovieTicket } from "../src/Models/movieTicket.model";
import { Order } from "../src/Models/order.model";


describe("OrderExport class tests", () => {
  beforeEach(() => {
    const order = new Order(1234, CustomerType.STUDENT);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      false,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, true, 2, 15);
    let ticket1 = new MovieTicket(movieScreening, true, 2, 16);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket1);
    order.export("WeekendOrdersJSON", order, TicketExportType.JSON);
    order.export("WeekendOrdersPLAIN", order, TicketExportType.PLAINTEXT);
  });

  it("Export order to JSON should make a JSON file", () => {
    let fileExists = fs.existsSync("./orders/json/WeekendOrdersJSON-1234.json");
    expect(fileExists).toBe(true);
  });

  it("Export order to text should make a .txt file", () => {
    let fileExists = fs.existsSync("./orders/text/WeekendOrdersPLAIN-1234.txt");
    expect(fileExists).toBe(true);
  });


  // afterAll(() => {
  //   fs.unlink("./orders/json/WeekendOrderJSON-1234.json", (err) => {
  //     if (err) throw err;
  //   });
  //   fs.unlink("./orders/text/WeekendOrdersPLAIN-1234.txt", (err) => {
  //     if (err) throw err;
  //   });
  // });
});