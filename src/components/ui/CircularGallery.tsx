import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import type { OGLRenderingContext } from 'ogl';
import { useEffect, useRef } from 'react';
import img1 from '@/assets/images/art-exhibition.jpg';
import img2 from '@/assets/images/curtural-events.jpg';
import img3 from '@/assets/images/science-lab.jpg';
import img4 from '@/assets/images/sports-img.jpg';
import img5 from '@/assets/images/students-inclass.jpg';
import img6 from '@/assets/images/school-img.jpg';
import img7 from '@/assets/images/vision-home-img.png';
import img8 from '@/assets/images/vision-legacy-img.jpg';
import img9 from '@/assets/images/moto-home-img.png';
import img10 from '@/assets/images/motto-legacy-img.jpg';
import img11 from '@/assets/images/legacy-img.avif';
import img12 from '@/assets/images/love-to-learn-img.avif';
//import moto1 from '@/assets/images/motopic.jpg';

// Type definitions
interface GalleryItem {
	image: string;
	text: string;
}

interface CircularGalleryProps {
	items?: GalleryItem[];
	bend?: number;
	textColor?: string;
	borderRadius?: number;
	font?: string;
	autoScrollSpeed?: number;
	scrollEase?: number;
}

interface ScrollState {
	ease: number;
	current: number;
	target: number;
	last: number;
	position?: number;
}

interface Screen {
	width: number;
	height: number;
}

interface Viewport {
	width: number;
	height: number;
}

interface TitleParams {
	gl: OGLRenderingContext;
	plane: Mesh;
	renderer: Renderer;
	text: string;
	textColor?: string;
	font?: string;
}

interface MediaParams {
	geometry: Plane;
	gl: OGLRenderingContext;
	image: string;
	index: number;
	length: number;
	renderer: Renderer;
	scene: Transform;
	screen: Screen;
	text: string;
	viewport: Viewport;
	bend: number;
	textColor?: string;
	borderRadius?: number;
	font?: string;
}

interface AppParams {
	items?: GalleryItem[];
	bend?: number;
	textColor?: string;
	borderRadius?: number;
	font?: string;
	autoScrollSpeed?: number;
	scrollEase?: number;
}

function lerp(p1: number, p2: number, t: number): number {
	return p1 + (p2 - p1) * t;
}

function autoBind<T extends object>(instance: T): void {
	const proto = Object.getPrototypeOf(instance);
	Object.getOwnPropertyNames(proto).forEach((key) => {
		const value = (instance as Record<string, unknown>)[key];
		if (key !== 'constructor' && typeof value === 'function') {
			// Properly typed function binding
			(instance as Record<string, unknown>)[key] = (value as (...args: unknown[]) => unknown).bind(instance);
		}
	});
}

function createTextTexture(
	gl: OGLRenderingContext,
	text: string,
	font: string = 'bold 30px monospace',
	color: string = 'black',
): { texture: Texture; width: number; height: number } {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;
	context.font = font;
	const metrics = context.measureText(text);
	const textWidth = Math.ceil(metrics.width);
	const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
	canvas.width = textWidth + 20;
	canvas.height = textHeight + 20;
	context.font = font;
	context.fillStyle = color;
	context.textBaseline = 'middle';
	context.textAlign = 'center';
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText(text, canvas.width / 2, canvas.height / 2);
	const texture = new Texture(gl, { generateMipmaps: false });
	texture.image = canvas;
	return { texture, width: canvas.width, height: canvas.height };
}

class Title {
	private gl: OGLRenderingContext;
	private plane: Mesh;
	private renderer: Renderer;
	private text: string;
	private textColor: string;
	private font: string;
	public mesh!: Mesh;

	constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }: TitleParams) {
		autoBind(this);
		this.gl = gl;
		this.plane = plane;
		this.renderer = renderer;
		this.text = text;
		this.textColor = textColor;
		this.font = font;
		this.createMesh();
	}

	createMesh(): void {
		const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
		const geometry = new Plane(this.gl);
		const program = new Program(this.gl, {
			vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
			fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
			uniforms: { tMap: { value: texture } },
			transparent: true,
		});
		this.mesh = new Mesh(this.gl, { geometry, program });
		const aspect = width / height;
		const textHeight = this.plane.scale.y * 0.15;
		const textWidth = textHeight * aspect;
		this.mesh.scale.set(textWidth, textHeight, 1);
		this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
		this.mesh.setParent(this.plane);
	}
}

class Media {
	private extra: number = 0;
	private geometry: Plane;
	private gl: OGLRenderingContext;
	private image: string;
	private index: number;
	private length: number;
	private renderer: Renderer;
	private scene: Transform;
	private screen: Screen;
	private text: string;
	private viewport: Viewport;
	private bend: number;
	private textColor?: string;
	private borderRadius: number;
	private font?: string;
	public program!: Program;
	public plane!: Mesh;
	public title!: Title;
	private scale!: number;
	private padding!: number;
	public width!: number;
	public widthTotal!: number;
	public x!: number;
	private isBefore!: boolean;
	private isAfter!: boolean;

	constructor({
		geometry,
		gl,
		image,
		index,
		length,
		renderer,
		scene,
		screen,
		text,
		viewport,
		bend,
		textColor,
		borderRadius = 0,
		font,
	}: MediaParams) {
		this.extra = 0;
		this.geometry = geometry;
		this.gl = gl;
		this.image = image;
		this.index = index;
		this.length = length;
		this.renderer = renderer;
		this.scene = scene;
		this.screen = screen;
		this.text = text;
		this.viewport = viewport;
		this.bend = bend;
		this.textColor = textColor;
		this.borderRadius = borderRadius;
		this.font = font;
		this.createShader();
		this.createMesh();
		this.createTitle();
		this.onResize();
	}

	createShader(): void {
		const texture = new Texture(this.gl, { generateMipmaps: false });
		this.program = new Program(this.gl, {
			depthTest: false,
			depthWrite: false,
			vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          // Removed the wavy animation that was causing shaking
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
			fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
			uniforms: {
				tMap: { value: texture },
				uPlaneSizes: { value: [0, 0] },
				uImageSizes: { value: [0, 0] },
				uBorderRadius: { value: this.borderRadius },
			},
			transparent: true,
		});
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = this.image;
		img.onload = () => {
			texture.image = img;
			this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
		};
	}

	createMesh(): void {
		this.plane = new Mesh(this.gl, {
			geometry: this.geometry,
			program: this.program,
		});
		this.plane.setParent(this.scene);
	}

	createTitle(): void {
		this.title = new Title({
			gl: this.gl,
			plane: this.plane,
			renderer: this.renderer,
			text: this.text,
			textColor: this.textColor,
			font: this.font,
		});
	}

	update(scroll: ScrollState, direction: string): void {
		this.plane.position.x = this.x - scroll.current - this.extra;

		const x = this.plane.position.x;
		const H = this.viewport.width / 2;

		if (this.bend === 0) {
			this.plane.position.y = 0;
			this.plane.rotation.z = 0;
		} else {
			const B_abs = Math.abs(this.bend);
			const R = (H * H + B_abs * B_abs) / (2 * B_abs);
			const effectiveX = Math.min(Math.abs(x), H);

			const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
			if (this.bend > 0) {
				this.plane.position.y = -arc;
				this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
			} else {
				this.plane.position.y = arc;
				this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
			}
		}

		const planeOffset = this.plane.scale.x / 2;
		const viewportOffset = this.viewport.width / 2;
		this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
		this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
		if (direction === 'right' && this.isBefore) {
			this.extra -= this.widthTotal;
			this.isBefore = this.isAfter = false;
		}
		if (direction === 'left' && this.isAfter) {
			this.extra += this.widthTotal;
			this.isBefore = this.isAfter = false;
		}
	}

	onResize({ screen, viewport }: { screen?: Screen; viewport?: Viewport } = {}): void {
		if (screen) this.screen = screen;
		if (viewport) {
			this.viewport = viewport;
			const programUniforms = this.plane.program.uniforms as Record<string, { value: unknown }>;
			if (programUniforms.uViewportSizes) {
				programUniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
			}
		}
		this.scale = this.screen.height / 1500;
		this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
		this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
		this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
		this.padding = 2;
		this.width = this.plane.scale.x + this.padding;
		this.widthTotal = this.width * this.length;
		this.x = this.width * this.index;
	}
}

class App {
	private container: HTMLElement;
	private autoScrollSpeed: number;
	private scroll: ScrollState;
	private renderer!: Renderer;
	private gl!: OGLRenderingContext;
	private camera!: Camera;
	private scene!: Transform;
	private screen!: Screen;
	private viewport!: Viewport;
	private planeGeometry!: Plane;
	private mediasImages!: GalleryItem[];
	private medias!: Media[];
	private raf!: number;
	private boundOnResize!: () => void;

	constructor(
		container: HTMLElement,
		{
			items,
			bend,
			textColor = '#ffffff',
			borderRadius = 0,
			font = 'bold 30px Figtree',
			autoScrollSpeed = 0.5,
			scrollEase = 0.05,
		}: AppParams = {},
	) {
		document.documentElement.classList.remove('no-js');
		this.container = container;
		this.autoScrollSpeed = autoScrollSpeed;
		this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
		this.createRenderer();
		this.createCamera();
		this.createScene();
		this.onResize();
		this.createGeometry();
		this.createMedias(items, bend, textColor, borderRadius, font);
		this.update();
		this.addEventListeners();
	}

	createRenderer(): void {
		this.renderer = new Renderer({ alpha: true });
		this.gl = this.renderer.gl;
		this.gl.clearColor(0, 0, 0, 0);
		if (this.gl.canvas instanceof HTMLCanvasElement) {
			this.container.appendChild(this.gl.canvas);
		}
	}

	createCamera(): void {
		this.camera = new Camera(this.gl);
		this.camera.fov = 45;
		this.camera.position.z = 20;
	}

	createScene(): void {
		this.scene = new Transform();
	}

	createGeometry(): void {
		this.planeGeometry = new Plane(this.gl, {
			heightSegments: 50,
			widthSegments: 100,
		});
	}

	createMedias(
		items?: GalleryItem[],
		bend: number = 1,
		textColor?: string,
		borderRadius?: number,
		font?: string,
	): void {
		const defaultItems: GalleryItem[] = [
			{ image: img1, text: 'Bridge' },
			{ image: img2, text: 'Desk Setup' },
			{ image: img3, text: 'Waterfall' },
			{ image: img12, text: 'Strawberries' },
			{ image: img4, text: 'Deep Diving' },
			{ image: img5, text: 'Train Track' },
			{ image: img6, text: 'Santorini' },
			{ image: img7, text: 'Blurry Lights' },
			{ image: img8, text: 'New York' },
			{ image: img9, text: 'Good Boy' },
			{ image: img10, text: 'Coastline' },
			{ image: img11, text: 'Palm Trees' },
		];
		const galleryItems = items && items.length ? items : defaultItems;
		this.mediasImages = galleryItems.concat(galleryItems);
		this.medias = this.mediasImages.map((data, index) => {
			return new Media({
				geometry: this.planeGeometry,
				gl: this.gl,
				image: data.image,
				index,
				length: this.mediasImages.length,
				renderer: this.renderer,
				scene: this.scene,
				screen: this.screen,
				text: data.text,
				viewport: this.viewport,
				bend,
				textColor,
				borderRadius,
				font,
			});
		});
	}

	onResize(): void {
		this.screen = {
			width: this.container.clientWidth,
			height: this.container.clientHeight,
		};
		this.renderer.setSize(this.screen.width, this.screen.height);
		this.camera.perspective({
			aspect: this.screen.width / this.screen.height,
		});
		const fov = (this.camera.fov * Math.PI) / 180;
		const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
		const width = height * this.camera.aspect;
		this.viewport = { width, height };
		if (this.medias) {
			this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
		}
	}

	update(): void {
		// Automatic scrolling
		this.scroll.target += this.autoScrollSpeed;

		this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
		const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
		if (this.medias) {
			this.medias.forEach((media) => media.update(this.scroll, direction));
		}
		this.renderer.render({ scene: this.scene, camera: this.camera });
		this.scroll.last = this.scroll.current;
		this.raf = window.requestAnimationFrame(this.update.bind(this));
	}

	addEventListeners(): void {
		this.boundOnResize = this.onResize.bind(this);
		window.addEventListener('resize', this.boundOnResize);
	}

	destroy(): void {
		window.cancelAnimationFrame(this.raf);
		window.removeEventListener('resize', this.boundOnResize);

		if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
			this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
		}
	}
}

export default function CircularGallery({
	items,
	bend = 3,
	textColor = '#ffffff',
	borderRadius = 0.05,
	font = 'bold 30px Figtree',
	autoScrollSpeed = 0.05,
	scrollEase = 0.05,
}: CircularGalleryProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const app = new App(containerRef.current, {
			items,
			bend,
			textColor,
			borderRadius,
			font,
			autoScrollSpeed,
			scrollEase,
		});

		return () => {
			app.destroy();
		};
	}, [items, bend, textColor, borderRadius, font, autoScrollSpeed, scrollEase]);

	return <div className="w-full h-full overflow-hidden" ref={containerRef} />;
}
