import { Component, OnInit } from '@angular/core';
import * as Matter from 'matter-js';
// @ts-ignore
import * as MatterTools from 'matter-tools';

@Component({
  selector: 'app-matter-js',
  templateUrl: './matter-js.component.html',
  styleUrls: ['./matter-js.component.scss']
})
export class MatterJsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var Example : any = Example || {};

    Example.car = function() {
      var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

      // create engine
      var engine = Engine.create(),
        world = engine.world;

      // create renderer
      var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
          width: 800,
          height: 600,
          wireframes: false
        }
      });

      Render.run(render);

      // create runner
      var runner = Runner.create();
      Runner.run(runner, engine);

      // add bodies
      World.add(world, [
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
      ]);

      var scale = 0.9;
      World.add(world, Composites.car(150, 100, 100 * scale, 40 * scale, 30 * scale));

      scale = 0.8;
      World.add(world, Composites.car(350, 300, 100 * scale, 40 * scale, 30 * scale));

      World.add(world, [
        Bodies.rectangle(200, 150, 400, 20, { isStatic: true, angle: Math.PI * 0.06 }),
        Bodies.rectangle(500, 350, 650, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
        Bodies.rectangle(300, 560, 600, 20, { isStatic: true, angle: Math.PI * 0.04 })
      ]);

      // add mouse control
      var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
        });

      World.add(world, mouseConstraint);

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // fit the render viewport to the scene
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
      });

      // context for MatterTools.Demo
      return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
          Matter.Render.stop(render);
          Matter.Runner.stop(runner);
        }
      };
    };

// create demo interface
// not required to use Matter.js

    MatterTools.Demo.create({
      toolbar: {
        title: 'matter-js',
        url: 'https://github.com/liabru/matter-js',
        reset: true,
        source: true,
        fullscreen: true,
        exampleSelect: true
      },
      preventZoom: true,
      resetOnOrientation: true,
      examples: [
        {
          name: 'Car',
          id: 'car',
          init: Example.car,
          sourceLink: 'https://github.com/liabru/matter-js/blob/master/examples/car.js'
        }
      ]
    });
  }
}
