import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { version } from '../core/constants';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      backdrop="blur"
      placement="center"
      classNames={{
        backdrop: "bg-slate-900/80 backdrop-blur-sm",
        base: "bg-slate-800 border border-slate-700",
        header: "border-b border-slate-700",
        body: "py-6",
        footer: "border-t border-slate-700",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-white">Credits</h2>
              <p className="text-sm text-slate-400 font-normal">
                Made with ❤️ by the community
              </p>
            </ModalHeader>
            
            <ModalBody>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    Development
                  </h3>
                  <div className="space-y-2 text-slate-300">
                    <p className='text-white font-medium'>• blals</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    Contributors
                  </h3>
                  <div className="space-y-2 text-slate-300">
                    <p>• TheHypeWalrus — Testing</p>
                  </div>
                </div>

                {/* Technologies Section */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-orange-400">🛠️</span>
                    Built With
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                      Tauri
                    </span>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                      React
                    </span>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                      Tailwind CSS
                    </span>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                      HeroUI
                    </span>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                      Framer Motion
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-400 text-center">
                    Version {version}
                  </p>
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button 
                color="primary" 
                onPress={onClose}
                className="bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium"
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}