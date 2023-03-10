import { MovieScreening } from "./moviescreening.model";
import { OrderType } from "./enumTypes";
import { IPremiumBehaviour } from "../strategy-pattern-price/interfaces/IPremiumBehaviour";
import { RegularPremium } from "../strategy-pattern-price/regularPremium";
import { StudentPremium } from "../strategy-pattern-price/studentPremium";

export class MovieTicket {
  private isPremium: boolean;
  private movieScreening: MovieScreening;
  private orderType: OrderType;
  private PremiumBehaviour: IPremiumBehaviour;
  private rowNr: number;
  private seatNr: number;
  public constructor(
    movieScreening: MovieScreening,
    isPremium: boolean,
    rowNr: number,
    seatNr: number,
    orderType: OrderType
  ) {
    this.rowNr = rowNr;
    this.seatNr = seatNr;
    this.movieScreening = movieScreening;
    this.isPremium = isPremium; // isPremium - isNotPremium
    this.orderType = orderType; // isStudent - isNotStudent

    switch (this.orderType) {
      case OrderType.REGULAR:
        this.PremiumBehaviour = new RegularPremium();
        break;
      case OrderType.STUDENT:
        this.PremiumBehaviour = new StudentPremium();
        break;
    }
  }

  public getMovieScreening(): MovieScreening {
    return this.movieScreening;
  }

  public getPrice(): number {
    return (
      this.movieScreening.getPricePerSeat() +
      this.PremiumBehaviour.getPremiumPrice(this.isPremium)
    );
  }

  public toString(): string {
    return `Ticket with row: ${this.rowNr} \r 
            Seat: ${this.seatNr} \r 
            Premium Ticket: ${this.isPremium ? "yes " : "no"} \r
            Moviescreening: ${this.movieScreening.tostring()}`;
  }
}
