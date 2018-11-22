import { CommonUtilModule } from './common-util.module';

describe('CommonUtilModule', () => {
  let commonUtilModule: CommonUtilModule;

  beforeEach(() => {
    commonUtilModule = new CommonUtilModule();
  });

  it('should create an instance', () => {
    expect(commonUtilModule).toBeTruthy();
  });
});
