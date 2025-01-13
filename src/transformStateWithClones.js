'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateClone, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateClone, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateClone);
        break;

      default: console.log('Unexpected type');
    }

    addStateToStates(states, stateClone);
  }

  function addProperties(stateClone, extraData) {
    for (const key in extraData) {
      stateClone[key] = extraData[key];
    }
  }

  function removeProperties(stateClone, keysToRemove) {
    for (const key of keysToRemove) {
      delete stateClone[key];
    }
  }

  function clearProperties(stateClone) {
    for (const key in stateClone) {
      delete stateClone[key];
    }
  }

  function addStateToStates(states, stateClone) {
    states.push({ ...stateClone });
  }

  return states;
}

module.exports = transformStateWithClones;
