import { AnimationDefinition } from 'ui/animation/animation';
import { AnimationCurve } from 'ui/enums';
import { getScreenHeight } from 'nativescript-swiss-army-knife';
export const screenInfo = getScreenHeight();

/**
 * Use in conjunctions with the css class `offset-for-slide` to slide content from righr to left
 */
export const SLIDE_RIGHT_ANIMATION: AnimationDefinition = {
  translate: { x: 0, y: 0 },
  duration: 200,
  curve: AnimationCurve.easeIn
};

export const SPIN_ANIMATION: AnimationDefinition = {
  rotate: 360,
  duration: 1500,
  iterations: Number.POSITIVE_INFINITY
};

export const SLIDE_UP_ANIMATION: AnimationDefinition = {
  translate: { x: 0, y: 0 },
  duration: 350,
  curve: AnimationCurve.easeInOut
};

export const SLIDE_DOWN_ANIMATION: AnimationDefinition = {
  translate: { x: 0, y: screenInfo.portrait },
  duration: 450,
  curve: AnimationCurve.easeInOut
};

export const SCALE_DOWN_ANIMATION: AnimationDefinition = {
  scale: { x: 0.9, y: 0.9 },
  duration: 300,
  curve: AnimationCurve.easeInOut
};

export const SCALE_UP_ANIMATION: AnimationDefinition = {
  scale: { x: 1, y: 1 },
  duration: 400,
  curve: AnimationCurve.easeInOut
};
