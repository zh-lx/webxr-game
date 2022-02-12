// import logo from './logo.svg';
// import './App.css';
import { createEnemyAttack } from './create-enemy-attack';

function App() {
  setTimeout(() => createEnemyAttack('enemy'), 100);

  return (
    <a-scene>
      <a-assets timeout="30000">
        <a-asset-item
          id="enemy_model"
          src="https://wow.techbrood.com/uploads/vrgames/hallovreen/models/zombi.gltf"
        ></a-asset-item>
      </a-assets>
      {/* <a-box
        id="enemy"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.2008php.com%2F2014_Website_appreciate%2F2014-12-26%2F20141226002529.jpg&refer=http%3A%2F%2Fwww.2008php.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647245601&t=0107ed033ba24b938290f6cf7ad5418a"
        position="0 2 -10"
        rotation="0 45 45"
        scale="2 2 2"
      ></a-box> */}
      <a-sphere
        height="0.01"
        width="0.01"
        color="red"
        geometry=""
        material=""
        position="0 2 -10"
        animation="property: position; dur: 2000; to: 0 0 0;"
      ></a-sphere>
      {/* <a-gltf-model src="#enemy_model"></a-gltf-model> */}
      <a-sky color="#222"></a-sky>
    </a-scene>
  );
}

export default App;
