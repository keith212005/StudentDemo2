import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name , params );
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
