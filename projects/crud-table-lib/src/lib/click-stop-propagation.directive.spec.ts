import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

describe('ClickStopPropagationDirective', () => {

  let directive;

  it('should create an instance', () => {
    directive = new ClickStopPropagationDirective();
    expect(directive).toBeTruthy();
  });

  it('should stop propagation of event', () => {
    const event = new Event('click');
    const stopPropagationSpy = spyOn(event, 'stopPropagation');

    directive.onClick(event);

    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
