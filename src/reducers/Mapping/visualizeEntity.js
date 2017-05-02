

export const VISUALIZE_ENTITY = 'VISUALIZE_ENTITY'
export const CLOSE_VISUALIZE_ENTITY = 'CLOSE_VISUALIZE_ENTITY'

export function visualizeEntity(entity) {
  return {type: VISUALIZE_ENTITY, entity}
}

export function closeVisualizeEntity() {
  return {type: CLOSE_VISUALIZE_ENTITY}
}
