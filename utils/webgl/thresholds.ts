import bayerThreshold2 from './thresholds/bayerThreshold2';
import bayerThreshold4 from './thresholds/bayerThreshold4';
import bayerThreshold8 from './thresholds/bayerThreshold8';
import blueNoiseThreshold16 from './thresholds/blueNoiseThreshold16';
import blueNoiseThreshold64 from './thresholds/blueNoiseThreshold64';
import halftoneThreshold4 from './thresholds/halftoneThreshold4';
import halftoneThreshold6 from './thresholds/halftoneThreshold6';
import halftoneThreshold8 from './thresholds/halftoneThreshold8';

const thresholds = {
  bayerThreshold8,
  bayerThreshold4,
  bayerThreshold2,
  blueNoiseThreshold64,
  blueNoiseThreshold16,
  halftoneThreshold8,
  halftoneThreshold6,
  halftoneThreshold4
};

export default thresholds;