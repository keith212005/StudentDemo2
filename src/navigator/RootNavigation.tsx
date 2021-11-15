import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function resetNavigation(name: any, params: any) {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: name, params}],
    }),
  );
}
