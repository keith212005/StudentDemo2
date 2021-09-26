import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later

    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: name}],
      }),
    );
  }
}

export function resetNavigation(name, params) {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: name, params}],
    }),
  );
}
