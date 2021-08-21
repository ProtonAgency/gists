class MultiStepForm {
  $prevButton;
  $nextButton;

  currentStep = 1;
  maxSteps = 3;

  constructor() {
    this.$prevButton = document.querySelector('#prev-step')
    this.$nextButton = document.querySelector('#next-step')

    this.init()
  }

  init() {
    this.$prevButton.addEventListener('click', this.prev.bind(this))
    this.$nextButton.addEventListener('click', this.next.bind(this))
  }

  prev() {
    if (this.currentStep === 1) {
      return;
    }

    this.currentStep--;
    this.$prevButton.disabled = this.currentStep === 1;
  }

  next() {
    if (this.currentStep === this.maxSteps) {
      return;
    }

    //todo: validate form fields before continuing

    let $container = this.getNextStepContainer()
    if ($container !== undefined) {
      $container.style.display = 'block';
    }

    let $prevContainer = this.getCurrentStepContainer()
    if ($prevContainer !== undefined) {
      $prevContainer.style.display = 'none';
    }

    this.$prevButton.disabled = false;

    this.currentStep++;
    if (this.currentStep === this.maxSteps) {
      this.$nextButton.setAttribute('type', 'submit')
      this.$nextButton.innerText = 'Create Bundle'
    }
  }

  getStepContainer(step) {
    return document.querySelector(`#step-${step}`)
  }

  getCurrentStepContainer() {
    return this.getStepContainer(this.currentStep)
  }

  getNextStepContainer() {
    if (this.currentStep < this.maxSteps) {
      return this.getStepContainer(this.currentStep + 1)
    }

    return undefined
  }

  getPrevStepContainer() {
    if (this.currentStep > 1) {
      return this.getStepContainer(this.currentStep - 1)
    }

    return undefined
  }
}

// EXAMPLE HTML
// <form method="post" action="{{ url()->current() }}">
//     @csrf

//     <div id="step-1">
//         <h2>Step One - Basic Info</h2>
//         <div class="form-group">
//             <label for="type">Type</label>
//             <input type="text" name="type" id="type" class="form-control" required/>
//         </div>
//     </div>

//     <div id="step-2" style="display: none">
//         <h2>Step Two - Sizes</h2>
//         <div class="row">
//             <div class="form-group col">
//                 <label for="size">Size</label>
//                 <input id="size" type="number" name="size" class="form-control" required>
//             </div>
//             <div class="form-group col">
//                 <label for="otp_container_product">OTP Container Product</label>
//                 <select id="otp_container_product" name="otp_container_product" class="form-control" required>
//                     @foreach($products as $product)
//                         @if(count($product['variants']) === 1)
//                             <option value="{{ $product['variants'][0]['id'] }}">{{ $product['title'] }} ({{ $product['variants'][0]['id'] }})</option>
//                         @else
//                             <optgroup label="{{ $product['title'] }}">
//                                 @foreach($product['variants'] as $variant)
//                                     <option value="{{ $variant['id'] }}">{{ $variant['title'] }} ({{ $variant['id'] }})</option>
//                                 @endforeach
//                             </optgroup>
//                         @endif
//                     @endforeach
//                 </select>
//             </div>
//             <div class="form-group col">
//                 <label for="recharge_container_product">ReCharge Container Product</label>
//                 <select id="recharge_container_product" name="recharge_container_product" class="form-control" required>
//                     @foreach($products as $product)
//                         @if(count($product['variants']) === 1)
//                             <option value="{{ $product['variants'][0]['id'] }}">{{ $product['title'] }} ({{ $product['variants'][0]['id'] }})</option>
//                         @else
//                             <optgroup label="{{ $product['title'] }}">
//                                 @foreach($product['variants'] as $variant)
//                                     <option value="{{ $variant['id'] }}">{{ $variant['title'] }} ({{ $variant['id'] }})</option>
//                                 @endforeach
//                             </optgroup>
//                         @endif
//                     @endforeach
//                 </select>
//             </div>
//         </div>
//         <small>You will be able to set up more sizes later.</small>
//     </div>

//     <div id="step-3" style="display: none; margin-bottom: 4rem;">
//         <h2>Step Three - Select Products</h2>

//         <div class="form-control">
//             <label for="bundle_products">Bundle Products</label>
//             <select id="bundle_products" name="bundle_products" class="form-control" multiple required>
//                 @foreach($products as $product)
//                     @if(count($product['variants']) === 1)
//                         <option value="{{ $product['variants'][0]['id'] }}">{{ $product['title'] }} ({{ $product['variants'][0]['id'] }})</option>
//                     @else
//                         <optgroup label="{{ $product['title'] }}">
//                             @foreach($product['variants'] as $variant)
//                                 <option value="{{ $variant['id'] }}">{{ $variant['title'] }} ({{ $variant['id'] }})</option>
//                             @endforeach
//                         </optgroup>
//                     @endif
//                 @endforeach
//             </select>
//         </div>
//     </div>

//     <div class="row">
//         <div class="col-md-6 text-left">
//             <button id="prev-step" type="button" class="btn btn-secondary" disabled>Previous Step</button>
//         </div>
//         <div class="col-md-6 text-right">
//             <button id="next-step" type="button" class="btn btn-primary">Next Step</button>
//         </div>
//     </div>

// </form>
