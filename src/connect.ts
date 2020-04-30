import { ComponentType } from 'react';
import { connect as connectRedux } from 'react-redux';

export type MapStateToProps<TStateProps, TOwnProps, State> = (state: State, ownProps: TOwnProps) => TStateProps;

export interface DecoratorAction {
  (component: ComponentType): any;
}

export interface Connect {
  <TStateProps = {}, TOwnProps = {}, State = {}>(
    mapStateToProps: MapStateToProps<TStateProps, TOwnProps, State>,
    mapDispatchToProps: any,
  ): DecoratorAction;
}

export const connect: Connect = (mapStateToProps, mapDispatchToProps) =>
  (component: ComponentType) =>
  connectRedux(mapStateToProps, mapDispatchToProps)(component);

export default connect;
