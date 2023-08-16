import {SkiQuery, SkiQueryIntegrationResult} from "@weski/types";

export class ApiIntegration {
  async* findHotels(query: SkiQuery): AsyncGenerator<SkiQueryIntegrationResult> {
    throw new Error('Method not implemented.');
  }




}
