import React from 'react';
import Tamagotchi from './tamagotchi/Tamagotchi';
import Poop from './tamagotchi/Poop';
import PropTypes from 'prop-types';

function TamaRoom(props) {
  return (
    <section className="tama-room-ext">
      <style jsx>
        {`
          .tama-room-ext {
            border: 4px dashed #f09;
            border-radius: 5px;
            overflow: hidden;
          }

          .tama-room-int {
            height: 462px;
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            background-color: #fff;
          }

          .vomit-pool {
            height: ${props.petConditions.vomitsOut * 25}px;
            width: 100%;
            position: absolute;
            bottom: 0;
            background-color: #0f08;
            cursor: pointer;
            transition: height 2s linear;
          }

          .litter-box {
            max-width: 400px;
            position: absolute;
            bottom: 25px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap-reverse;
            padding: 25px 0 0;
          }
        `}
      </style>
      <div className="tama-room-int">
        <Tamagotchi
          petStatus={props.petStatus}
          petConditions={props.petConditions}
        />
        <div className="vomit-pool" onClick={() => props.onDrainVomit()}></div>
        <div className="litter-box">
          {Object.keys(props.petConditions.poopsOut).map(poopId => {
            return (
              <Poop
                poopId={poopId}
                poopStatus={props.petConditions.poopsOut[poopId].status}
                onScoopPoop={props.onScoopPoop}
                key={poopId}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

TamaRoom.propTypes = {
  petStatus: PropTypes.object.isRequired,
  petConditions: PropTypes.object.isRequired,
  onDrainVomit: PropTypes.func.isRequired,
  onScoopPoop: PropTypes.func.isRequired
};

export default TamaRoom;
