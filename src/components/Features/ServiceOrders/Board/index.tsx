'use client'

import { Flex } from '@/components/Core/Display'
import { ReactSortable } from 'react-sortablejs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '@/components/Core/Modal'
import { ServiceOrderToolbar } from './Toolbar'
import { SkeletonItemList } from './Skeleton'
import { useBoard } from './hook'
import { ServiceOrderForm } from '../Form'

const getAvatarName = (name: string) => {
  const nameSplited = name.split(' ')

  if (nameSplited.length === 1) {
    return `${name[0]}${name[1]}`.toLocaleUpperCase()
  }

  return (
    nameSplited[0][0].toLocaleUpperCase() +
    nameSplited[1][0].toLocaleUpperCase()
  )
}

export const ServiceOrderBoard = () => {
  const {
    handleDeleteOrderService,
    handleUpdateStatus,
    handleChangeUpdateModal,
    serviceOrdersDone,
    serviceOrdersDoneItems,
    serviceOrdersImpediment,
    serviceOrdersImpedimentItems,
    serviceOrdersInProgress,
    serviceOrdersInProgressItems,
    serviceOrdersTodo,
    serviceOrdersTodoItems,
    handleClickCard,
    serviceOrderSelected,
    updateModal,
  } = useBoard()

  return (
    <Flex className="flex-col gap-8 w-full">
      <ServiceOrderToolbar />

      <Flex className="justify-between items-start w-full mb-10">
        <Flex className="board-list">
          <header className="board-list--header">A Fazer</header>
          {!serviceOrdersTodo && (
            <Flex className="board-list--body">
              {Array.from(Array(2).keys()).map((item, index) => (
                <SkeletonItemList key={`todo-${index + 1}`} />
              ))}
            </Flex>
          )}
          <ReactSortable
            group="service-orders"
            className="board-list--body"
            list={serviceOrdersTodoItems}
            onAdd={(e, sortable, store) =>
              handleUpdateStatus(e.item.getAttribute('data-id') ?? '', 'todo')
            }
            setList={() => null}
          >
            {serviceOrdersTodoItems?.map((item) => (
              <Flex
                className="board-card"
                onClick={() => handleClickCard(item.id)}
                data-id={item.id}
                key={item.id}
              >
                <span className="board-card--header">#{item.id}</span>
                <span className="board-card--body">{item.description}</span>
                <Flex className="board-card--footer">
                  <span className="board-card--avatar">
                    {getAvatarName(item.client.name)}
                  </span>
                  <span>{item.dt_order.toLocaleDateString('pt-BR')}</span>
                </Flex>
              </Flex>
            ))}
          </ReactSortable>
        </Flex>

        <Flex className="board-list">
          <header className="board-list--header">Em progresso</header>
          {!serviceOrdersInProgress && (
            <Flex className="board-list--body">
              {Array.from(Array(2).keys()).map((item, index) => (
                <SkeletonItemList key={`todo-${index + 1}`} />
              ))}
            </Flex>
          )}
          <ReactSortable
            group="service-orders"
            className="board-list--body"
            list={serviceOrdersInProgressItems}
            onAdd={(e, sortable, store) =>
              handleUpdateStatus(
                e.item.getAttribute('data-id') ?? '',
                'in progress'
              )
            }
            setList={() => null}
          >
            {serviceOrdersInProgressItems.map((item) => (
              <Flex
                className="board-card"
                onClick={() => handleClickCard(item.id)}
                data-id={item.id}
                key={item.id}
              >
                <span className="board-card--header">#{item.id}</span>
                <span className="board-card--body">{item.description}</span>
                <Flex className="board-card--footer">
                  <span className="board-card--avatar">
                    {getAvatarName(item.client.name)}
                  </span>
                  <span>{item.dt_order.toLocaleDateString('pt-BR')}</span>
                </Flex>
              </Flex>
            ))}
          </ReactSortable>
        </Flex>

        <Flex className="board-list">
          <header className="board-list--header">Impedimento</header>
          {!serviceOrdersImpediment && (
            <Flex className="board-list--body">
              {Array.from(Array(2).keys()).map((item, index) => (
                <SkeletonItemList key={`todo-${index + 1}`} />
              ))}
            </Flex>
          )}
          <ReactSortable
            group="service-orders"
            className="board-list--body"
            list={serviceOrdersImpedimentItems}
            onAdd={(e, sortable, store) =>
              handleUpdateStatus(
                e.item.getAttribute('data-id') ?? '',
                'impediment'
              )
            }
            setList={() => null}
          >
            {serviceOrdersImpedimentItems.map((item) => (
              <Flex
                className="board-card"
                onClick={() => handleClickCard(item.id)}
                data-id={item.id}
                key={item.id}
              >
                <span className="board-card--header">#{item.id}</span>
                <span className="board-card--body">{item.description}</span>
                <Flex className="board-card--footer">
                  <span className="board-card--avatar">
                    {getAvatarName(item.client.name)}
                  </span>
                  <span>{item.dt_order.toLocaleDateString('pt-BR')}</span>
                </Flex>
              </Flex>
            ))}
          </ReactSortable>
        </Flex>

        <Flex className="board-list">
          <header className="board-list--header">Concluído</header>
          {!serviceOrdersDone && (
            <Flex className="board-list--body">
              {Array.from(Array(2).keys()).map((item, index) => (
                <SkeletonItemList key={`todo-${index + 1}`} />
              ))}
            </Flex>
          )}
          <ReactSortable
            group="service-orders"
            className="board-list--body"
            list={serviceOrdersDoneItems}
            setList={() => null}
            onAdd={(e, sortable, store) =>
              handleUpdateStatus(e.item.getAttribute('data-id') ?? '', 'done')
            }
          >
            {serviceOrdersDoneItems.map((item) => (
              <Flex
                className="board-card"
                onClick={() => handleClickCard(item.id)}
                data-id={item.id}
                key={item.id}
              >
                <span className="board-card--header">#{item.id}</span>
                <span className="board-card--body">{item.description}</span>
                <Flex className="board-card--footer">
                  <span className="board-card--avatar">
                    {getAvatarName(item.client.name)}
                  </span>
                  <span>{item.dt_order.toLocaleDateString('pt-BR')}</span>
                </Flex>
              </Flex>
            ))}
          </ReactSortable>
        </Flex>
      </Flex>

      <Flex className="w-full justify-center">
        <Flex className="flex-col w-60 justify-center relative">
          <Flex
            id="board-trash"
            className="flex justify-center bg-primary-300 p-4 h-10 w-full"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Flex>
          <ReactSortable
            group="service-orders"
            className=" bg-primary-50 flex flex-col gap-3 w-full list-delete h-40 z-3"
            list={[]}
            setList={() => null}
            onAdd={(e) =>
              handleDeleteOrderService(e.item.getAttribute('data-id') ?? '')
            }
          >
            <Flex />
          </ReactSortable>
        </Flex>
      </Flex>

      {serviceOrderSelected && (
        <Modal
          open={updateModal}
          onChangeOpen={handleChangeUpdateModal}
          className="!w-auto !h-auto"
          title="Cadastrar Ordem de Serviço"
        >
          <ServiceOrderForm
            data={serviceOrderSelected}
            afterSubmit={handleChangeUpdateModal}
          />
        </Modal>
      )}
    </Flex>
  )
}
